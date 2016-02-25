/**
 * 新闻列表页
 * @author [author] xiaoming
 * @date 2016/02/04
 */
import { Header, Gallery } from 'amazeui-react/dist/amazeui.react';
import Reqwest from 'reqwest/src/reqwest';

let menuList = {
  title: '嘻哈新闻',
  data: {
    left: [
      {
        link: 'javascript:history.go(-1)',
        icon: 'angle-left',
      },
    ],
  },
};

const newsList = React.createClass({
  getInitialState: function(){
  	return {
      allNum: 0,
  		contentlist: [],
      allPages: 0,
      currentpage: 0,
      maxResult: 20,
  	}
  },
  componentDidMount: function(){
    Reqwest({
      url: "/remotenews",
      type: 'json',
      method: 'post', 
      contentType: 'application/json',
      data: JSON.stringify({page:this.state.currentpage++}),
      success: function(res){
        let resbody = JSON.parse(res);
        this.setState(resbody);
      }.bind(this),
      error: function(err){
        console.log(err);
      },
    });
  },
  getNewsByLink: function(url){
    Reqwest({
      url: '/remotenews',
      method: 'GET',
      data: {url: url},
      success: function(res){
        
      },
      error: function(err){
        console.log(err);
      },
    });
  },
  render() {
  	let newList = [], obj = this;

  	this.state.contentlist.map(function(elem, index) {
      let imgnum = elem.imageurls.length;
      let onelist = null, listfooter = <div className="am-list-item-text">{elem.channelName} {elem.source}</div>;
      switch (imgnum) {
        case 0:
          onelist = <li key={index} onClick={obj.getNewsByLink.bind(null, elem.link)}><a href='javascript:;'><h3 className="xm-hd">{elem.title}</h3>{listfooter}</a></li>;
          break;
        case 1:
          onelist = <li key={index} className="am-g" onClick={obj.getNewsByLink.bind(null, elem.link)}><a href='javascript:;'><div className="am-u-sm-8 am-list-main"><h3 className="xm-hd">{elem.title}</h3>{listfooter}</div><div className="am-u-sm-4 am-list-thumb"><img src={elem.imageurls[0].url} className="xm-img" alt="小图片"/></div></a></li>;
          break;
        default:
          imgnum = (imgnum>3)? 3:imgnum;
          let imgdata = [];
          for(let j=0,imgelem = elem.imageurls; j<imgnum; j++){
            imgdata.push({img: imgelem[j].url});
          }

          onelist = <li key={index} onClick={obj.getNewsByLink.bind(null, elem.link)}><a href='javascript:;'><h3 className="xm-hd">{elem.title}</h3><Gallery data={imgdata} className="am-avg-sm-3"/>{listfooter}</a></li>;
          break;
      }

      return newList.push(onelist);
    })

    return (
      <div ref={(ref)=>this.myTestInput = ref}>
        <Header {...menuList} className="am-header-fixed"/>
        <ul className="am-list am-list-static xm-list">
          {newList}
        </ul>
      </div>
    );
  },
});

export default newsList;
