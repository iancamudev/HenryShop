

interface HeaderLinkProps{
	name:string;
	callback:()=>void;
}

const HeaderLink = ({name, callback}:HeaderLinkProps) => {

	return (
		<>
			<h6
	      className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer"
	      onClick={() => {
	        callback();
	      }}
	    >
	      {name}
	    </h6>
		</>
	)

}

export default HeaderLink;