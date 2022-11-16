import {category} from '../../Types';
import {Category} from '../../models/Category';

export const addNewCategory = async (category: category) => {
	const categoryFind = await Category.findOne({name: category.name});
	if(!category.name) throw new Error('information missing'); 
	else if(categoryFind) throw new Error('category already exists');
	else if(!categoryFind){
		const result = await Category.create({name: category.name});
		return result;
	}
	return {error: "no pasa nada"};
};

export const getAllCategory = async () => {
	const result = await Category.find({});
	return result;
}

export const getCategoryById = async (id:string) => {
	const result = await Category.findOne({_id: id});
	return result;
}