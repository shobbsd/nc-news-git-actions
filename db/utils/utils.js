exports.formatDates = list => {
  return list.map(({ created_at, ...rest }) => {
    const returnOb = { ...rest };
    returnOb.created_at = new Date(created_at);
    return returnOb;
  });
};

exports.makeRefObj = list => {
  return list.reduce((ref, { title, article_id }) => {
    ref[title] = article_id;
    return ref;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return this.formatDates(comments).map(
    ({ belongs_to, created_at, created_by, ...rest }) => {
      const returnObj = { ...rest };
      returnObj.article_id = articleRef[belongs_to];
      returnObj.author = created_by;
      return returnObj;
    }
  );
};
