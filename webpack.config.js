const path = require("path") ;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEV = (process.env.NODE_ENV || "production") === "dev";

const CONFIG = {
    entry: path.resolve(__dirname, "./client/client.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: DEV ? "bundle.js" : "bundle.[hash].js"
    },
    module: {
        loaders: [
            { test: /\.js/, loader: "babel" },
            { test: /\.scss/, loader: ExtractTextPlugin.extract("css!sass") }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./client/index.html")
        }),
        new ExtractTextPlugin("bundle.css", {
            allChunks: true
        })
    ].concat(DEV ? [
        // dev only
    ] : [
        // prod only
        new CleanWebpackPlugin(["dist"])
    ])
};

module.exports = CONFIG;
