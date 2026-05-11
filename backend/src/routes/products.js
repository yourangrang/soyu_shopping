const express =  require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer')

const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// S3에 업로드할 때 사용할 storage 설정
const storage = process.env.NODE_ENV === 'production'
  ? multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
    //   acl: 'public-read', 
      key: function (req, file, cb) {
        cb(null, `uploads/${Date.now()}_${file.originalname}`);
      }
    })
  : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      }
    });

const upload = multer({ storage: storage }).single('file');

// 이미지 업로드 API
router.post('/image', auth, async (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            return res.status(500).send(err);
        }
        
        // production에서는 S3에 업로드된 파일의 URL을 반환
        if (process.env.NODE_ENV === 'production') {
            return res.json({
                fileUrl: res.req.file.location
        });
        } else {
            return res.json({
                fileUrl: `/uploads/${res.req.file.filename}`
        });
        }

        // if (process.env.NODE_ENV === 'production') {
        //     return res.json({ fileName: res.req.file.key, fileUrl: res.req.file.location });
        // } else {
        //     return res.json({ fileName: res.req.file.filename });
        // }
    });
}); 

// 


router.get('/:id', async (req, res, next) => {
    const type = req.query.type;
    let productIds = req.params.id;


    if(type === 'array') {
        //id = 123456789,123456789,123456789
        //productIds = ['123456789', '123456789', '123456789',]
        let ids = productIds.split(',');
        productIds = ids.map(item => {
            return item
        })
    }

    try {
        const product = await Product
            .find({ _id: { $in: productIds} })
            .populate('writer');

        return res.status(200).send(product);
        
    } catch (error) {
        next(error);
    }
}) //상품디테일 페이지


router.get('/', async (req, res, next) => {
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};
    for (let key in req.query.filters) {
        if (req.query.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.query.filters[key][0],
                    $lte: req.query.filters[key][1]
                }
            } else {
                findArgs[key] = req.query.filters[key];
            }
        }
    }

    if (term) {
        findArgs["$text"] = {$search: term};
    }

    console.log(findArgs);

    try {
        const products = await Product.find(findArgs)
        .populate('writer')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)

        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore
        })
        
    } catch (error) {
        next(error);
    }
}) //products데이터 가져오기

router.post('/', auth, async (req, res, next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}) //상품등록


module.exports = router