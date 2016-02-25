import {
  Navbar,
} from 'amazeui-react/dist/amazeui.react';

//底部导航栏
let barData = [{
  title: "主页",
  icon: "home",
},{
  title: "计划",
  icon: "cart-plus",
},{
  title: "个人中心",
  icon: "user-secret",
}];

const Title = React.createClass({
  render() {
    return (
      <div className="am-with-fixed-header xm-width-fixed-bottom">
        {this.props.children}
        <Navbar data={barData}/>        
      </div>
    );
  },
});

export default Title;
