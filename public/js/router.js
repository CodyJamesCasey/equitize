var Router = React.createClass({

	changePage: function(event){
    	var currentPage = this.state.initialPage;
    	currentPage = event;
    	this.setState({currentPage: currentPage});
	},

	getInitialState:function(){
		return {
			initialPage: 'home',
			currentPage: ''
		}
	},

	componentWillMount: function(){
  this.setState({currentPage: this.state.initialPage})
	},

	render: function(){
	return (
    <body>
			<Header changePage={this.changePage} />
			<MainPage currentPage={this.state.currentPage} />
			<Footer currentPage={this.state.currentPage} />
		</body>
  	);
	}
});

React.render(<Router/>, document.body);