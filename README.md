# filemanager-template

# Introduction

filemanager-template is a lightweight, cross-platform template written in HTML5 & vanilla javascript and sass without any dependencies. 

# Features 

* IE9 support.
* Theme system.
* Integrated File Editor (no framework).

# Usage

Use the HTML Markup in `index.html` and include the distribution files in `dist` folder to your application.

# Personalization

## Create a new theme with SASS

* Add colors to : `sass/varibales/_variables`.
* Add new item in the theme options list in : `.settings-modal .themes-list`.

After that re-compile the sass-files, running `npm run build`.

## Changing the default theme with CSS

You can override the default theme using the CSS variables.

```css

:root {
    --main-color: #acc97d;
    --secondary-color: #70d094;
}

.fm-wrapper .loader-container .loader {
    border-color: var(--main-color);
    border-right-color: var(--secondary-color);
}

.fm-wrapper .sidebar .brand,
.fm-wrapper .btn-primary,
.fm-wrapper .slidebar,
.fm-wrapper .modal .modal-header,
.fm-wrapper .badge {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    background-color: var(--main-color) !important;
}

.fm-wrapper .files-table .file-item.selected,
.fm-wrapper .move-file-modal ul.files-list li.dir-item.selected:before {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    background-color: var(--secondary-color) !important;
    opacity: -8;
}

.fm-wrapper .header,
.fm-wrapper .footer,
.fm-wrapper .btn-secondary,
.fm-wrapper .upload-modal .files-to-upload .file-item .start-upload .progress .progress-bar,
.fm-wrapper .movefile-modal ul.files-list li.dir-item.selected:before {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    background-color: var(--secondary-color) !important;
}

.fm-wrapper .checkbox input[type='checkbox']:checked + .checkbox-text:before {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    background-color: var(--main-color) !important;
    border: 0.05em solid var(--main-color) !important;
}

.fm-wrapper .btn-outline:hover {
    background-color: var(--main-color);
}

.fm-wrapper .btn-svg svg path {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    fill: var(--main-color);
}

.fm-wrapper.dark-red-theme .info-list .info-item .info-icon svg path {
    -webkit-transition: background-color .5s linear;
    transition: background-color .5s linear;
    fill: var(--secondary-color);
}
```




