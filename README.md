# vanilla-filemanager

> A simple filemanager template written in HTML5, vanilla javascript, and sass without any dependencies and frameworks.

![](https://user-images.githubusercontent.com/49124992/87870746-ec072e80-c9a2-11ea-8bd1-480d1050bee8.gif)

## Features

* Support IE9 and above.
* Theme system.
* Integrated File Editor (no syntax highlighting).
* Optimized for ajax applications.

## Applications that uses this template

* [ftp-filemanager](https://github.com/AmraniCh/ftp-filemanager)

## Usage

Use the HTML Markup in `index.html` or `dist/index.html`(no comments) and include the distribution files in `dist` folder to your application.

### Dealing with the integrated editor 

`window.FmEditor` Object provides some basic methods to manipulate data in the editor.

**Supported methods :**

* fmEditor.add(content)
* fmEditor.append(content)
* fmEditor.get()
* fmEditor.clear()

**Example**

```js
fmEditor.add('Hello world!');
```

### Modals error alerts

When an operation (ajax request) fails some times, and you want to show the server-side error, so the user knows what happen.

For that purpose all modals components haves an error alert div inside their body, to show the alert just add class 'show' to the div.

**Example**

```js
fmWrapper.querySelector('#addFileModal .alert.error').classList.toggle('show');
```

### Sidebar and table section loaders

Showing loaders before loading data is usually important, so users know that's your site is still running and responsive.

**Hide & Show Sidebar loader**

```js
fmWrapper.querySelector('.sidebar .loader').classList.toggle('show');
```

**Hide & Show Table loader**

```js
fmWrapper.querySelector('.table-section .loader').classList.toggle('show');
```

## Personalization

### Manage themes with SASS

#### Changing the themes colors.

If you want to change the theme colors of the app, you can do this easily by changing the theme colors in `src/sass/variables/_variables`, then re-compile the sass files. 

#### Create a new theme

1. Add colors to : `src/sass/variables/_variables`.
2. Add new theme option item in the settings modal in : `.settings-modal .themes-list`.
3. After that re-compile the sass-files, running `npm run build`.

### Manage themes with CSS

#### Changing the default theme with CSS

You can change the default theme using the `dist/custom-theme.css`, just change the CSS vars with your custom colors.

## Performance

### Using inline svgs

The HTML Markup haves big lines of code if you notice, that because of inline svgs, so why we use inline svgs instead of icon fonts? There are some important advantages that let us make this choice.

* Flickering issues with icon fonts, the inline svgs render along with the DOM, whereas the icon fonts load after the rest of the other content, and users may see some flickering before loading completely the page, using svgs solves this problem.

* Fewer HTTP requests, as svgs are part of the DOM no need for another HTTP request, unlike icon fonts.

## IE Compatibility

In regard to support some legacy browsers like IE9, we use polyfills to mimic the functionality of some js methods, however, the template working just fine in IE9 and above. 

## Contribution

If you find some bugs or you have some suggestions to improve this project, or just you want to improve and practice your skills in javascript and sass then this is a good place to, take a look in `TODO.md`, there is a lot of things to improve and features to add, however, if you want to contribute fork the repo and send a pull request with your feature to add, thank you!.
