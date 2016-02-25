import {
  Header,
  Slider,
} from 'amazeui-react/dist/amazeui.react';
import MenuBar from './menuBar.jsx';
import TodayPlan from './todayPlan';

let menuList = {
  title: '嘻哈',
  onSelect: function(nav, e) {
    e.preventDefault();
    console.log('你点击了', nav);
    // do something
  },
};

let sliderIntance = (
  <Slider>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/>
    </Slider.Item>
    <Slider.Item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/></Slider.Item>
  </Slider>
);

const indexPage = React.createClass({
	render: function(){
		return(
			<div>
				<Header {...menuList} className="am-header-fixed"/>
		        {sliderIntance}
		        <MenuBar />
		        <TodayPlan />
			</div>		
		);
	},
});

export default indexPage;