var data = [
    {
        "2018": {
            "A_my": {
                "authors": "A et al.",
                "title": "My first paper",
                "date-created": "2018-09-01",
                "referenced-n-times-global": 0,
                "referenced-n-times-local": 0,
                "references-keys": [
                    "D_old"
                ]
            },
            "B_friendly": {
                "authors": "B et al.",
                "title": "Friendly paper",
                "date-created": "2018-04-23",
                "referenced-n-times-global": 5,
                "referenced-n-times-local": 0,
                "references-keys": [
                    "D_old",
                    "E_older"
                ]
            }
        }
    },
    {
        "2017": {}
    },
    {
        "2016": {
            "F_young": {
                "authors": "F et al.",
                "title": "Young paper",
                "date-created": "2016-02-16",
                "referenced-n-times-global": 37,
                "referenced-n-times-local": 1,
                "references-keys": []
            },
            "C_another": {
                "authors": "C et al.",
                "title": "Another friendly paper",
                "date-created": "2016-12-05",
                "referenced-n-times-global": 8,
                "referenced-n-times-local": 0,
                "references-keys": [
                    "F_young"
                ]
            }
        }
    },
    {
        "2015": {}
    },
    {
        "2014": {}
    },
    {
        "2013": {
            "D_old": {
                "authors": "D et al.",
                "title": "Old paper",
                "date-created": "2013-04-01",
                "referenced-n-times-global": 236,
                "referenced-n-times-local": 2,
                "references-keys": []
            }
        }
    },
    {
        "2012": {
            "E_older": {
                "authors": "E et al.",
                "title": "Older paper",
                "date-created": "2012-08-13",
                "referenced-n-times-global": 412,
                "referenced-n-times-local": 1,
                "references-keys": []
            }
        }
    }
];

var constants = {
    minimumSize: 2,
    maximumSize: 8
};

export {data, constants};
