/*
- CommentBox
    - CommentList
        - Comment
    - CommentForm
**/

// 每个组件，根据自己的　props 渲染自己1次
// 但 props 是不可更变的: 它们从父节点传递过来，被父节点"拥有"
// state: 是组件私有的，可以通过 this.setState() 来改变它
// 当state改变时，组件会重新渲染自己

// 创建一个自定义标签，叫 CommentBox
var CommentBox = React.createClass({
    // 在组件的生命周期，仅执行1此，设置组件的初始化状态，设置了 state
    getInitialState: function(){
        return {data: []};
    },
    // 发送请求，获取最新评论数据
    // componentDidMount 是组件被渲染时, react 自动调用的方法
    // 动态更新组件的关键，是调用 setState
    componentDidMount: function(){
        $.get(this.props.url, function(data){
            // this.state.data = data;
            // this.setState();
            // 或
            this.setState({data: data});
        }.bind(this), "json");
    },
    // 评论成功
    handleCommentSubmit: function(data){
        console.log("评论成功");
        // 插入假评论
        var comments = this.state.data;
        var newComments = comments.concat([data]);
        this.setState({data: newComments});
    },
    // 必经 render
    // 使用了 state 的数据，而不是 props 的
    render: function(){
        return (
            <div className="commentBox">
                <h1>Comment</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

// 创建列表
var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>{comment.text}</Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

// 声明一个 markdown 转换器
var converter = new Showdown.converter();

// 通过 this.props 可以访问到传入的属性
// this.props.children 代表 innerHtml
// 默认 显示 的内容，都会被转义
// 如果不想被转义，需要使用 dangerouslySetInnerHTML={{__html: ''}} 属性
var Comment = React.createClass({
    render: function(){
        var rawMarkup = converter.makeHtml( this.props.children.toString() );
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

// 创建评论
var CommentForm = React.createClass({
    // 提交数据
    handleSubmit: function(e){
        e.preventDefault();
        var nAuthor = this.refs.author.getDOMNode(), nText = this.refs.text.getDOMNode();
        var author = nAuthor.value.trim();
        var text = nText.value.trim();
        if(!text || !author){
            return;
        }
        // TODO 发送请求
        nAuthor.value = "";
        nText.value = "";

        // 调用父亲的 onCommentSubmit 方法
        this.props.onCommentSubmit({author: author, text: text});
    },
    render: function(){
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something" ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


React.render(
    <CommentBox url="comments.json" />,
    document.getElementById('content')
);
