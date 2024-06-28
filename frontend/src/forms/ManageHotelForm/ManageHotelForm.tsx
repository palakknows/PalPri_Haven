import { FormProvider, useForm } from "react-hook-form";
import GuestsSection from "../GuestsSection";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import TypeSection from "./TypeSection";

export type HotelFormData={
    name: string;
    city: string;
    country: string;
    description :string;
    type: string;
    pricePerNight:number;
    StarRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount:number;
}
const ManageHotelForm = () => {
    const formMethods=useForm<HotelFormData>();
    return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10">
            <DetailsSection/>
            <TypeSection/>
            <FacilitiesSection/>
            <GuestsSection/>
        </form>
        </FormProvider>
    );
};
export default ManageHotelForm;