# sissi-packs – webpack configuration for [sissi]

<img src='https://raw.githubusercontent.com/square-a/sissi/master/sissi.png'  width='160px' />

Hi, it’s me again. *sissi*, your ***si**mple **s**tatic **si**tes* generator.

If you want to turn your simple React app into a static site with a built-in CMS look no further! Or actually, do: [the sissi repo][sissi] is where you'll find all you need. See you there!

If you're a sissi fan and want to contribute – welcome! I'm glad you're here. I have to apologise, though. Please bear with me. I have but two parents and they are working hard on their sissi-to-do-lists. *Contribution guidelines* and *thorough documentation of all packages* are somewhere in there. Somewhere... For now, this will have to do:

## What sissi-packs can do
*sissi-packs* is a set of [webpack](https://webpack.js.org) configurations optimised for [sissi] projects and based on the [create-react-app](https://github.com/facebook/create-react-app) settings.

The `dev` configuration is used during development with `sissi dev` and provides a webpack dev server.

The `prod` configuration bundles the app for snapshotting in a `tmp` folder. *sissi-packs* processes JSX, images and [SCSS](https://sass-lang.com/) and exposes the *EntryComponent* as default export for [sissi-guides].

[sissi]:https://github.com/square-a/sissi
[sissi-guides]:https://github.com/square-a/sissi-guides
