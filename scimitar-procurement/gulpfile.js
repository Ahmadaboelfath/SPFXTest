"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);
build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push({
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: "url-loader",
        },
      ],
    });

    return generatedConfiguration;
  },
});
build.lintCmd.enabled = false;
build.tslintCmd.enabled = false;
build.initialize(require("gulp"));
