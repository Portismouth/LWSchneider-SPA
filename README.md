[https://github.com/Portismouth/LWSchneider-SPA](https://github.com/Portismouth/LWSchneider-SPA)

## To Manage Content
Go to WordPress CMS to manage images and most site content.

## Styling
In most cases, styling is managed in the styles folder.

## Bootstrap
Layout is mainly handled using the bootstrap grid. Some components like PanelTitle and PanelText can take custom col settings. Can be specified for each breakpoint as an object or single int value via component colSpan prop. Default values are col-10 col-lg-5. Reactstrap is imported but only used to handle the navbar and carousels on the About and Capabalities page.

## Pages
I haven't yet created a master page component. So each page is it's own component. Panel index is managed in a redux store.

## Animations
All done via CSS.
 -page transitions are in base.scss
 -windstop animation is in windstop.scss

## How to Push Updates Live
```
npm run build
```
* Copy over /src and /public to lws/react
* #2ez

