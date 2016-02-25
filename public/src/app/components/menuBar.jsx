/**
 * [MenuBar description]
 * @description [icon菜单组件]
 * @author [xiaoming]
 * @date 2016/02/03
 */
import { Grid, Col } from 'amazeui-react/dist/amazeui.react';
import { Link } from 'react-router';

const MenuBar = React.createClass({
	render: function(){
		return(
			<Grid className='doc-g xm-g'>
				<Col sm={4}>
					<Link to="/list">
						<div className="am-icon-btn am-success am-icon-newspaper-o"></div>
						<div>新闻</div>
					</Link>
				</Col>
				<Col sm={4}>
					<a href="##" className="am-icon-btn am-danger am-icon-music"></a>
					<div>音乐</div>
				</Col>
				<Col sm={4}>
					<a href="##" className="am-icon-btn am-secondary am-icon-bed"></a>
					<div>游戏</div>
				</Col>
			</Grid>
		);
	},
});

export default MenuBar;