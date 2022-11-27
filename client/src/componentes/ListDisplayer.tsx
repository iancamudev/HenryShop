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
			<div>
				<span>{name}: </span>
				{listElements[0] !== undefined?listElements.map(element => <span onClick ={() => {
					setState(element)}} key = {element.value}>
						{`${element.value} | ${element.quantity}`}
				</span>): null}
			</div>
		</>
	)

};

export default ListDisplayer;