const graphql = require("graphql");
const ItemType = require("./TypeDefs/ItemType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

var itemController = require("../controllers/itemController");
var shopController = require("../controllers/shopController");
const Item = require("../models/Item");
const ShopType = require("./TypeDefs/ShopType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllItem: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return itemController.item_all(args);
      },
    },
    findItem: {
      type: ItemType,
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_details_by_id(args);
      },
    },
    findItemByName: {
      type: new GraphQLList(ItemType),
      args: {
        searchWord: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return itemController.item_search(args);
      },
    },
    findItemList: {
      type: new GraphQLList(ItemType),
      args: {
        idList: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_list(args);
      },
    },
    checkShopName: {
      type: ShopType,
      args: {
        shopname: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return shopController.shop_check_name(args);
      },
    },
    findShop: {
      type: ShopType,
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return shopController.shop_details(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        ITEM_NAME: {
          type: GraphQLString,
        },
        SHOP: {
          type: GraphQLString,
        },
        CATEGORY: {
          type: GraphQLString,
        },
        ITEM_IMAGE: {
          type: GraphQLString,
        },
        PRICE: {
          type: GraphQLFloat,
        },
        QUANTITY_AVAILABLE: {
          type: GraphQLInt,
        },
        QUANTITY_SOLD: {
          type: GraphQLInt,
        },
        DESCRIPTION: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        //   console.log(args);
        return itemController.item_add_new(args);
      },
    },
    editItem: {
      type: ItemType,
      args: {
        _id: {
          type: GraphQLString,
        },
        ITEM_NAME: {
          type: GraphQLString,
        },
        SHOP: {
          type: GraphQLString,
        },
        CATEGORY: {
          type: GraphQLString,
        },
        ITEM_IMAGE: {
          type: GraphQLString,
        },
        PRICE: {
          type: GraphQLFloat,
        },
        QUANTITY_AVAILABLE: {
          type: GraphQLInt,
        },
        QUANTITY_SOLD: {
          type: GraphQLInt,
        },
        DESCRIPTION: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_edit(args);
      },
    },
    addShop: {
      type: ShopType,
      args: {
        SHOP_NAME: {
          type: GraphQLString,
        },
        OWNER: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return shopController.shop_add_new(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
