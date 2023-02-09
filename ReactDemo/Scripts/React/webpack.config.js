module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: "./app.js",
        Index: "./Component/Index.js",
        Navbar: "./Common/Navbar.js",
       
        AddEditCustomer: "./CustomerMaster/AddEditCustomer.js",
        DeleteCustomer: "./CustomerMaster/DeleteCustomer.js",
        FetchProduct: "./Product/FetchProduct.js",
        AddEditProduct: "./Product/AddEditProduct.js",
        DeleteProduct: "./Product/DeleteProduct.js",
        FetchStore: "./Store/FetchStore.js",
        AddEditStore: "./Store/AddEditStore.js",
        DeleteStore: "./Store/DeleteStore.js",
        FetchSales: "./Sales/FetchSales.js",
        AddEditSale:"./Sales/AddEditSales.js",
       

    }
    ,
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    }
    ,
    watch: true,
    resolve: {
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_models)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }

        ]
    }
};
