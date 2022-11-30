import {useState, useEffect} from 'react';

interface listDisplayer {
	elements:Array<variant>;
	setState:any;
	name:string;
}

interface variant{
  value:string;
  quantity:number;
}

const ListDisplayer =  ({elements, setState, name}: listDisplayer) => {

	const [listElements, setListElements] = useState<Array<variant>>([]);

	useEffect(() => {
		setListElements(elements)
	},[elements]);

	return (
		<>
			<div className = "w-2/3 border border-black border-solid">
				<span>{name}: </span>
				<div className = "w-full items-center flex flex-wrap justify-evenly">
					{listElements[0] !== undefined?listElements.map(element => <button className = "w-4/12 mt-2 mx-1 p-2 duration-300 hover:bg-yellow hover:duration-300 w-1/3 py-2 rounded-sm bg-gray-200 font-bold my-1.5" onClick ={(event:any) => {
						event.preventDefault();
						setState(element)}} key = {element.value}>
							{`${element.value} | ${element.quantity}`}
					</button>): null}
				</div>
			</div>
		</>
	)

};

export default ListDisplayer;