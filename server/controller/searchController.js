const productdb = require('../model/product');

exports.find = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: "No queries found." });
    }
    try {
        const minPrice = Number(query) - 500;
        const maxPrice = Number(query) + 500;
        const searchResults = await productdb.aggregate([
            {
                $match: {
                    $or: [
                        { productName: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                        { price: { $gte: minPrice, $lte: maxPrice } }
                    ]
                }
            }
        ]);
        console.log(searchResults);
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: "An error occurred during the search.",error });
    }
}


