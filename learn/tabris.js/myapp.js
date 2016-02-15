var page = tabris.create("Page", {
  topLevel: true,
  title: "myapp"
});

tabris.create("TextView", {
  layoutData: {centerX: 0, centerY: 0},
  text: "My First App"
}).appendTo(page);

page.open();
