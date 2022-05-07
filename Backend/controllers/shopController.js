const Shop = require("../models/Shop");
const User = require("../models/User");

exports.shop_check_name = (req, res) => {
  const shopname = req.body.data;
  Shop.findOne(
    {
      SHOP_NAME: shopname,
    },
    (error, shop) => {
      if (error) {
        res.json({
          status: "error",
          message: "Error in mongo connection",
          error: error,
        });
      }
      if (shop) {
        res.json({
          status: "ok",
          message: "Shop already exist",
          shopFound: true,
        });
      } else {
        res.json({ status: "ok", shopFound: false });
      }
    }
  );
};

exports.shop_add_new = (req, res) => {
  const { shopname, userId } = req.body.data;
  const newShop = new Shop({
    SHOP_NAME: shopname,
    OWNER: userId,
  });
  newShop.save(function (err) {
    if (err) {
      return res.json({
        status: "error",
        error: err,
        message: "error adding shop",
      });
    } else {
      User.findOne({
        _id: userId,
      }).then((user) => {
        user.SHOP = newShop._id;
        user.save((error) => {
          if (error) {
            throw error;
          }
        });
        res.json({
          status: "ok",
          shop: {
            SHOP: newShop._id,
          },
        });
      });
    }
  });
};

exports.shop_details = (req, res) => {
  const shopid = req.query.shopid;
  Shop.findOne({
    _id: shopid,
  })
    .populate("OWNER")
    .populate("SHOP_ITEMS")
    .exec()
    .then((shop) => {
      res.json({ status: "ok", shop: shop });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.shop_add_photo = (req, res) => {
  const { ShopImage, ShopId } = req.body.data;
  // console.log(req.body.data);
  Shop.findOne({
    _id: ShopId,
  })
    .then((shop) => {
      // console.log(shop);
      shop.SHOP_IMAGE = ShopImage;
      shop.save();
      res.json({ status: "ok" });
    })
    .catch((error) => {
      console.log(error);
    });
};
