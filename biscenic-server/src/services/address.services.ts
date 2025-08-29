import  Address  from "../models/address.model";

interface AddressInput {
  user: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

export const addAddress = async (data: AddressInput) => {
  const { user, isDefault } = data;

  if (isDefault) {
    await Address.updateMany({ user }, { $set: { isDefault: false } });
  }
  return await Address.create(data);
};

export const getAllAddresses = async (userId: string) => {
  return await Address.find({ user: userId });
};

export const updateAddress = async (id: string, userId: string, updates: Partial<AddressInput>) => {
  const address = await Address.findOne({ _id: id, user: userId });

  if (!address) {
    throw new Error("Address not found");
  }

  if (updates.isDefault) {
    await Address.updateMany({ user: userId }, { $set: { isDefault: false } });
  }

  Object.assign(address, updates);
  return await address.save();
};

export const deleteAddress = async (id: string, userId: string) => {
  const address = await Address.findOneAndDelete({ _id: id, user: userId });

  if (!address) {
    throw new Error("Address not found");
  }
};



export function createAddress(arg0: { user: string; street: any; city: any; state: any; country: any; zipCode: any; phoneNumber: any; isDefault: boolean; }) {
    throw new Error('Function not implemented.');
}