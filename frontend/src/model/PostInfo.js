class PostInfo {
    constructor(id, title, author, date, content, likedUsers) {
        this.id = id;
        this.title = title;
        this.author = author;
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