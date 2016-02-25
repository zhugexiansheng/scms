import {
  Breadcrumb,
  Icon,
  Panel,
  Alert,
} from 'amazeui-react/dist/amazeui.react';
import Reqwest from 'reqwest/src/reqwest';

let bool = true;

const breadcrumbInstance = (
  <Breadcrumb slash={bool}>
    <Breadcrumb.Item href="http://www.amazeui.org">
      <Icon icon="home" />首页
    </Breadcrumb.Item>
    <Breadcrumb.Item href="#">分类</Breadcrumb.Item>
    <Breadcrumb.Item active={bool}>新增新闻</Breadcrumb.Item>
  </Breadcrumb>
);

const viewZone = React.createClass({
  getInitialState: function(){
    return {
      title:'',
      content:'',
    }
  },
  submitForm: function(e){
    e.preventDefault();
    let title = this.state.title.trim();
    let content = this.state.content.trim();

    if( !title || !content ){
      return;
    }

    Reqwest({
      url: '/news',
      type: 'json',
      method: 'post', 
      contentType: 'application/json',
      data: JSON.stringify({'title': title, 'content': content}),
      success: function(resp){
        this.setState({title: '', content: ''});
      }.bind(this),
      error: function(err){
        console.error(err);
      },
    });
  },
  handleTitleChange: function(e){
    this.setState({title:e.target.value});
  },
  handleContentChange: function(e){
    this.setState({content:e.target.value});
  },
  render() {
    let submitForm = (
      <Panel>
        <form className="am-form" onSubmit={this.submitForm}>
          <fieldset>
            <legend>添加新闻</legend>
            <div className="am-form-group">
              <label htmlFor="title">标题</label>
              <input type="text" id="title" placeholder="输入新闻标题" value={this.state.title} onChange={this.handleTitleChange}/>
            </div>
            <div className="am-form-group">
              <label htmlFor="content">内容</label>
              <textarea rows="5" id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
            </div>
            <p><button type="submit" className="am-btn am-btn-default">提交</button></p>
          </fieldset>
        </form>
      </Panel>
    );

    return (
      <div>
        <div>{breadcrumbInstance}</div>
        <div>{submitForm}</div>
      </div>
    );
  },
});

export default viewZone;
