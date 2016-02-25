/**
 * todayPlan
 * @description 首页显示的今日计划列表
 * @author  [xiaoming]
 * @date 2016/02/03
 */
import { Titlebar, Grid, Col, Thumbnail } from 'amazeui-react/dist/amazeui.react';

const todayPlan = React.createClass({
	render: function(){
		let data = [{
		  title: 'more \u00BB',
		  link: '#more',
		}];

		return (
			<div className="xm-panel">
				<Titlebar title="今日计划" nav={data} className="xm-topauto"/>
				<Grid className='doc-g xm-g'>
					<Col sm={6} lg={3}>
						<Thumbnail caption="健身" href="#" src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
					</Col>
					<Col sm={6} lg={3}>
						<Thumbnail href="#" caption="读书" src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/>
					</Col>
					<Col sm={6} lg={3}>
						<Thumbnail href="#" caption="学习" src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/>
					</Col>
					<Col sm={6} lg={3}>
						<Thumbnail href="#" caption="娱乐" src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/>
					</Col>
				</Grid>
			</div>
		);
	},
});

export default todayPlan;