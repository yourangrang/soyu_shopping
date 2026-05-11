const clothings = [
    {
        "_id": 1,
        "name": "자켓"
    },
    {
        "_id": 2,
        "name": "상의"
    },
    {
        "_id": 3,
        "name": "드레스"
    },
    {
        "_id": 4,
        "name": "팬츠"
    },
    {
        "_id": 5,
        "name": "스커트"
    },
    {
        "_id": 6,
        "name": "신발"
    },
]

const gender = [
    {
        "_id": 1,
        "name": "남성복"
    },
    {
        "_id": 2,
        "name": "여성복"
    }
]
const color = [
    {
        "_id": 1,
        "name": "블랙"
    },
    {
        "_id": 2,
        "name": "화이트"
    },
    {
        "_id": 3,
        "name": "브라운"
    },
    {
        "_id": 4,
        "name": "블루"
    },
    {
        "_id": 5,
        "name": "그린"
    },
    {
        "_id": 6,
        "name": "실버"
    },
]

const fit = [
    {
        "_id": 1,
        "name": "슬림핏"
    },
    {
        "_id": 2,
        "name": "레귤러핏"
    },
    {
        "_id": 3,
        "name": "루즈핏"
    },
    {
        "_id": 4,
        "name": "오버핏"
    },
    {
        "_id": 5,
        "name": "와이드핏"
    }
]

const style = [
    {
        "_id": 1,
        "name": "미니멀"
    },
    {
        "_id": 2,
        "name": "스트릿"
    },
    {
        "_id": 3,
        "name": "빈티지"
    },
    {
        "_id": 4,
        "name": "클래식"
    },
    
]

const prices = [
    {
        "_id": 0,
        "name": "모두",
        "array": []
    },
    {   
        "_id": 1,
        "name": "만원이하",
        "array": [0, 9900]
    },
    {
        "_id": 2,
        "name": "1만원대",
        "array": [10000, 19900]
    },
    {
        "_id": 3,
        "name": "2만원대",
        "array": [20000, 29900]
    },
    {
        "_id": 4,
        "name": "3만원대",
        "array": [30000, 39900]
    },
    {
        "_id": 5,
        "name": "4만원~",
        "array": [40000, 1500000]
    }
]

export {
    clothings,
    prices,
    color,
    fit,
    gender,
    style
}
