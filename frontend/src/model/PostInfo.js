class PostInfo {
    constructor(id, title, author, authorId, date, content, likedUsers) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.authorId = authorId;
        this.date = date;
        this.content = content;
        this.likedUsers = likedUsers;
        if(!likedUsers){
            this.numberOfLikes = 0
        }else{
            this.numberOfLikes = likedUsers.length;
        }
    }
  }
  
  export default PostInfo;