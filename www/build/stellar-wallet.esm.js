import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-79b97f50.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["stellar-loader",[[1,"stellar-loader",{"interval":[8],"chances":[32],"chance":[32]}]]],["stellar-prompt",[[1,"stellar-prompt",{"prompter":[1040],"input":[32]}]]],["stellar-wallet",[[1,"stellar-wallet",{"server":[16],"homeDomain":[16],"toml":[16],"account":[32],"prompter":[32],"loading":[32],"error":[32]}]]]], options);
});
