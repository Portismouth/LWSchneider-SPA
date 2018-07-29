[https://github.com/Portismouth/LWSchneider-SPA](https://github.com/Portismouth/LWSchneider-SPA)

## To Manage Content
Go to WordPress CMS to manage images and most site content.

## Styling
In most cases, styling is managed in the styles folder.

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

