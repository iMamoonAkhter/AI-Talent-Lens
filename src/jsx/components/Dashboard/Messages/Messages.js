import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Tab, Nav ,Dropdown} from "react-bootstrap";

 // import images 
import user1 from '../../../../images/users/1.png';
import user2 from '../../../../images/users/2.png';
import user3 from '../../../../images/users/3.png';
import user4 from '../../../../images/users/4.png';
import user5 from '../../../../images/users/5.png';
import user6 from '../../../../images/users/6.png';
import user7 from '../../../../images/users/7.png';
import user9 from '../../../../images/users/9.png';

const imgBlog1 = [
	{	image : user2, name: 'Olivia Rellaq', time:'25m ago' , 
		para: 'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{	image : user3, name: 'Keanu Tipes', time:'41m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},
	{	image : user4, name: 'Laura Chyan', time:'5m ago' , 
		para: 'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept',
	},
	{	image : user5, name: 'Roberto Charloz', time:'25m ago' , 
		para: 'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{	image : user6, name: 'Keanu Tipes', time:'25m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},
	{	image : user7, name: 'Laura Chyan', time:'25m ago' , 
		para: 'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept',
	},
];


const Tab1 = () =>{
	return(
		<Fragment>
			{imgBlog1.map((item,index)=>(	
				<div className="media mb-4" key="index">
					<div className="image-bx">
					<img src={item.image} alt="" className="rounded-circle mr-sm-4 mr-2 img-1" />
					</div>
					<div className="media-body">
						<div className="d-flex mb-sm-2 mb-0">
							<h6 className="text-black mb-0 font-w600 fs-16">{item.name}</h6>
							<span className="ml-auto fs-14">{item.time}</span>
						</div>
						<p className="text-black">{item.para}</p>
					</div>
				</div>
			))}
			
		</Fragment>
	)
};

const imgBlog2 = [
	
	{	image : user3, name: 'Keanu Tipes', time:'41m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},	
	{	image : user5, name: 'Roberto Charloz', time:'25m ago' , 
		para: 'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{	image : user6, name: 'Keanu Tipes', time:'25m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},
	{	image : user7, name: 'Laura Chyan', time:'25m ago' , 
		para: 'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept',
	},
];

const Tab2 = () =>{
	return(
		<Fragment>
			{imgBlog2.map((item,index)=>(	
				<div className="media mb-4" key="index">
					<div className="image-bx">
					<img src={item.image} alt="" className="rounded-circle mr-sm-4 mr-2 img-1" />
					</div>
					<div className="media-body">
						<div className="d-flex mb-sm-2 mb-0">
							<h6 className="text-black mb-0 font-w600 fs-16">{item.name}</h6>
							<span className="ml-auto fs-14">{item.time}</span>
						</div>
						<p className="text-black">{item.para}</p>
					</div>
				</div>
			))}
		</Fragment>
	)
};

const imgBlog3 = [
	
	
	{	image : user5, name: 'Roberto Charloz', time:'25m ago' , 
		para: 'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{	image : user3, name: 'Keanu Tipes', time:'41m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},
	{	image : user6, name: 'Keanu Tipes', time:'25m ago' , 
		para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
	},
	{	image : user7, name: 'Laura Chyan', time:'25m ago' , 
		para: 'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept',
	},
	{	image : user4, name: 'Laura Chyan', time:'5m ago' , 
		para: 'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept',
	},
];


const Tab3 = () =>{
	return(
		<Fragment>
			{imgBlog3.map((item,index)=>(	
				<div className="media mb-4" key="index">
					<div className="image-bx">
						<img src={item.image} alt="" className="rounded-circle mr-sm-4 mr-2 img-1" />
					</div>
					<div className="media-body">
						<div className="d-flex mb-sm-2 mb-0">
							<h6 className="text-black mb-0 font-w600 fs-16">{item.name}</h6>
							<span className="ml-auto fs-14">{item.time}</span>
						</div>
						<p className="text-black">{item.para}</p>
					</div>
				</div>
			))}
			
		</Fragment>
	)
};

const tabData = [
      { name: "Home",     content: <Tab1/> , 	},
      { name: "Profile",  content: <Tab2/> , 	},
      { name: "Contact",  content: <Tab3/> , 	},
      { name: "Message",  content: <Tab2/> , 	},
   ];

class Messages extends React.Component{
	render(){
		return(
			<Fragment>
				{/* <!-- Add Order --> */}
				<div className="modal fade" id="addOrderModalside">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Create Project</h5>
								<button type="button" className="close" data-dismiss="modal"><span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label className="text-black font-w500">Project Name</label>
										<input type="text" className="form-control" />
									</div>
									<div className="form-group">
										<label className="text-black font-w500">Deadline</label>
										<input type="date" className="form-control" />
									</div>
									<div className="form-group">
										<label className="text-black font-w500">Client Name</label>
										<input type="text" className="form-control" />
									</div>
									<div className="form-group">
										<button type="button" className="btn btn-primary">CREATE</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-5">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body d-sm-flex d-block align-items-center">
										<div className="d-flex mr-auto mb-sm-0 mb-2 align-items-center">
											<img src={user1} alt="" width="60" className="rounded-circle mr-3" />
											<div>
												<h5 className="fs-18 text-black font-w600">Peter Parkur</h5>
												<Dropdown>
													<Dropdown.Toggle   variant	className=" icon-false p-0" >
														<Link to={"#"} className="text-primary " data-toggle="dropdown" aria-expanded="false">
															<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
																<circle cx="4" cy="4" r="4" fill="#2953E8"/>
															</svg>
															Available
															<i className="las la-angle-down text-dark ml-2"></i>
														</Link>
													</Dropdown.Toggle>
													<Dropdown.Menu className="dropdown-menu-right">
														<Dropdown.Item  to={"#"}>Available</Dropdown.Item>
														<Dropdown.Item  to={"#"}>Unavailable</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</div>
										</div>
										<Link to={"/contacts"} className="btn btn-primary btn-rounded"><i className="las la-comment-dots mr-2 scale5"></i>+ New</Link>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
										<div className="card-header d-sm-flex d-block shadow-sm border-0 align-items-center">
											<div className="card-action card-tabs mt-3 mt-sm-0 mt-3 mt-sm-0 ">
												<Nav as="ul" className="nav nav-tabs ">
													{tabData.map(  (data, i) =>
														i !== tabData.length - 1 && (
														<Nav.Item as="li" key={i}>
														   <Nav.Link
															  eventKey={data.name.toLowerCase()}
														   >
															  {" "}
															  {i === 1
																 ? "Unread"
																 : i === 2
																 ? "Archived "
																 : "All Message"}
														   </Nav.Link>
														</Nav.Item>
													))}
												</Nav>
											</div>
										</div>
										
										<PerfectScrollbar className="card-body message-bx dlab-scroll height520" id="message-bx" >
											<Tab.Content >
											   {tabData.map(
												  (data, i) =>
													 i !== tabData.length - 1 && (
														<Tab.Pane
														   eventKey={data.name.toLowerCase()}
														   key={i}
														>
														   <div>{data.content}</div>
														   
														</Tab.Pane>
													 )
											   )}
											</Tab.Content>
										</PerfectScrollbar>
										
									</Tab.Container>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-7">
						<div className="row">
							<div className="col-xl-12">
								<div className="card  message-bx chat-box">
									<div className="card-header border-0 shadow-sm">
										<div className="d-flex mr-auto align-items-center">
											<div className="image-bx mr-sm-4 mr-2">
												<img src={user5} alt="" className="rounded-circle img-1" />
												<span className="active"></span>
											</div>
											<div>
												<h5 className="text-black font-w600 mb-sm-1 mb-0 title-nm">Roberto Charloz</h5>
												<span>Last seen 4:23 AM</span>
											</div>
										</div>
									</div>
										<PerfectScrollbar className="card-body dlab-scroll height640" id="chartBox" >
											<div className="media mb-4 justify-content-end align-items-end">
												<div className="message-sent">
													<p className="mb-1">
														sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
													</p>
													<span className="fs-12">9.30 AM</span>
												</div>
												<div className="image-bx ml-sm-4 ml-2 mb-4">
													<img src={user9} alt="" className="rounded-circle img-1" />
													<span className="active"></span>
												</div>
											</div>
											<div className="media mb-4  justify-content-end align-items-end">
												<div className="message-sent">
													<p className="mb-1">
														nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
													</p>
													<span className="fs-12">9.30 AM</span>
												</div>
												<div className="image-bx ml-sm-4 ml-2 mb-4">
													<img src={user9} alt="" className="rounded-circle img-1" />
													<span className="active"></span>
												</div>
											</div>
											<div className="media mb-4  justify-content-start align-items-start">
												<div className="image-bx mr-sm-4 mr-2">
													<img src={user5} alt="" className="rounded-circle img-1" />
													<span className="active"></span>
												</div>
												<div className="message-received">
													<p className="mb-1">
														Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptat
													</p>
													<span className="fs-12">4.30 AM</span>
												</div>
											</div>
											<div className="media justify-content-start align-items-start">
												<div className="image-bx mr-sm-4 mr-2">
													<img src={user5} alt="" className="rounded-circle img-1" />
													<span className="active"></span>
												</div>
												<div className="message-received">
													<p className="mb-1">
														Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept
													</p>
													<span className="fs-12">4.30 AM</span>
												</div>
											</div>
										
										</PerfectScrollbar>
									<div className="card-footer border-0 type-massage">
										<div className="input-group">
											<textarea className="form-control" placeholder="Type message..."></textarea>
											<div className="input-group-append">
												<button type="button" className="btn shadow-none pr-0"><i className="las la-paperclip scale5"></i></button>
												<button type="button" className="btn shadow-none"><i className="las la-image scale5"></i></button>
												<button type="button" className="btn btn-primary light rounded">SEND</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					
			</Fragment>
		)
	}
}

export default Messages;
