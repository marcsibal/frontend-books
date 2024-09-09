

export const navigation = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'books',
        title: 'Books',
        icon: 'library_books',
        type: 'item',
        url: 'apps/books/list',
        exactMatch: true
      }
    ]
  }
];
