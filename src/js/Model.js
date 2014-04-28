(function() {
  // *******************************************************
  console.group('%c%s', labelStyle, label('changeイベント'));
  
  var BookModel = Backbone.Model.extend({
  });
  
  var bookModel = new BookModel();
  
  // changeイベント
  bookModel.on('change', function(model, options) {
    console.log('%c%s', titleStyle, '[change]', model, options);
  });
  
  // 属性名をつけるとその属性が変更された場合に呼び出される。
  bookModel.on('change:bookName', function(model, options) {
    console.log('%c%s', titleStyle, '[change:bookName]', model, options);
    console.log('bookName previous:' + bookModel.previous('bookName'));
  });
  
  // changeイベントのテスト
  bookModel.on('change:price', function(model, options) {
    console.log('%c%s', titleStyle, '[change:price]', model, options);
  });
  
  console.log('%c%s', titleStyle, "bookModel.set('bookName', 'よく分かるBackbone.js')");
  bookModel.set('bookName', 'よく分かるBackbone.js');
  console.log('%c%s', titleStyle, "bookModel.set('bookName', 'よく分かるBackbone.js <改訂版>')");
  bookModel.set('bookName', 'よく分かるBackbone.js <改訂版>');
  // 最後にsetにより変更された値
  console.log('bookModel.changed:', bookModel.changed);

  console.log('%c%s', titleStyle, "bookModel.set('price', 2980)");
  bookModel.set('price', 2980);
  
  console.log('price.has? ' + bookModel.has('price'));
  bookModel.unset('price');
  console.log('price.unset has? ' + bookModel.has('price'));

  console.groupEnd();

  // *******************************************************
  console.group('%c%s', labelStyle, label('初期化'));
  BookModel = Backbone.Model.extend({
    initialize: function() {
      console.log('# initialize');
      console.log('属性');
      for (var attr in this.attributes) {
        console.log(attr + ':' + this.get(attr));
      }
    }
  });

  // コンストラクタの1番目の引数は属性
  bookModel = new BookModel({
    bookName: 'よくわかるJavaScript',
    price: 4000
  });

  console.groupEnd();
  
  // *******************************************************
  console.group('%c%s', labelStyle, label('デフォルト値'));
  BookModel = Backbone.Model.extend({
    defaults: {
      bookName: 'Java',
      price: 3000,
      authors: ['山田太郎', '佐藤花子']
    }
  });

  bookModel = new BookModel();
  var bookModel2 = new BookModel();
  
  console.log('bookModel.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModel2.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModelのauthor[0]を変更');
  var authors = bookModel.get('authors');
  authors[0] = 'やまだたろう';
  console.log('bookModel.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModel2.authors[0]=' + bookModel2.get('authors')[0]);

  console.groupEnd();

  // *******************************************************
  console.group('%c%s', labelStyle, label('デフォルト値'));
  BookModel = Backbone.Model.extend({
    defaults: function() {
      return {
        bookName: 'Java',
        price: 3000,
        authors: ['山田太郎', '佐藤花子']
      };
    }
  });

  bookModel = new BookModel();
  bookModel2 = new BookModel();
  
  console.log('bookModel.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModel2.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModelのauthor[0]を変更');
  authors = bookModel.get('authors');
  authors[0] = 'やまだたろう';
  console.log('bookModel.authors[0]=' + bookModel.get('authors')[0]);
  console.log('bookModel2.authors[0]=' + bookModel2.get('authors')[0]);

  console.groupEnd();
  
  // *******************************************************
  console.group('%c%s', labelStyle, label('validate'));
  BookModel = Backbone.Model.extend({
    validate: function(attrs) {
      if (!attrs.bookName) {
        return '書名は必須';
      }
    }
  });

  bookModel = new BookModel();
  bookModel.on('invalid', function(message, a, b) {
    console.log('invalid:', message, a, b);
  });
  console.log('値のセット');
  bookModel.set('price', 3000);
  console.log('値のセット2');
  // setする際にオプションを渡さないとvalidationはされない
  bookModel.set({ price: 3000 }, { validate: true });  
  console.log('isValid? ' + bookModel.isValid());
  bookModel.set('bookName', 'valid');
  console.log('isValid? ' + bookModel.isValid());
  console.groupEnd();
})();
