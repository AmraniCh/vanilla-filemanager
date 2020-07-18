# filemanager-template

# Introduction

filemanager-template is a lightweight, cross-browser template written in HTML5 & vanilla javascript and sass without any dependencies and frameworks. 

# Features 

* IE9 support.
* Theme system.
* Integrated File Editor (no syntax highlighting).
* Optimized for ajax applications.

# Usage

Use the HTML Markup in `index.html` and include the distribution files in `dist` folder to your application.

## Dealing with the integrated editor 

`window.FmEditor` Object provides some basic methods to manipulate data in the editor, this is the supported methods.

**method**        | description
---               | ---
add(content)      | Append content.
replace(content)  | Replace the entire content.
clear()           | Clear content.

**Example**

```js
FmEditor.add('Hello world!');
```

## Modals error alerts

When an operation fails some times, and you want to show the server side error, so the user know what happen.

For that purpose all modals components haves an error alert div inside their body, to show the alert just add class 'show' to the div.

**Example**

```js
fmWrapper.querySelector('#addFileModal .alert.error').classList.toggle('show');
```

## Sidebar and table section loaders

Showing loaders before loading data is usually important, so users know that's your site is still running and responsive.

**Hide & Show Sidebar loader**

```js
fmWrapper.querySelector('.sidebar .loader').classList.toggle('show');
```

**Hide & Show Table loader**

```js
fmWrapper.querySelector('.table-section .loader').classList.toggle('show');
```

# Personalization

## Manage themes with SASS

### Changing the themes colors.

If you want to change the theme colors of the app, you can do this easily by changing the theme colors in `src/sass/variables/_variables`, then re-compile the sass files. 

### Create a new theme

1. Add colors to : `src/sass/variables/_variables`.
2. Add new theme option item in the settings modal in : `.settings-modal .themes-list`.
3. After that re-compile the sass-files, running `npm run build`.

## Manage themes with CSS

### Changing the default theme with CSS

You can change the default theme using the `dist/custom-theme.css`, just change the CSS vars with your custom colors.

# Performance

## Using inline svgs

The HTML Markup haves a big lines of code if you notice, that because of inline svgs, so why we use an inline svgs instead of icon fonts ?, this is some important advantages that's let us to make this choice.

* Flickering issues with icon fonts, the inline svgs render along with the DOM, whereas the icon fonts load after the rest of the other content, and users may see some flickering before loading completely the page, using svgs solves this problem.

* Fewer http requests, as svgs are part of the DOM no need for another http request, unlike icon fonts.


