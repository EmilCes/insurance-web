import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PolicyPlanTypesResponse } from '@/api/policy.api';

const FilterMenuStatus = ({
    isAlwaysEmpty,
    policyPlanTypes,
    changeTypePoliciesResults,
    changeStatusPoliciesResults,
}: {
    isAlwaysEmpty: boolean;
    policyPlanTypes: PolicyPlanTypesResponse | undefined;
    changeTypePoliciesResults: (type: string) => void;
    changeStatusPoliciesResults: (status: number) => void;
}) => {
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

    const handleStatusChange = (status: number) => {
        if (selectedStatus === status) {
            setSelectedStatus(0);
            changeStatusPoliciesResults(0);
        } else {
            setSelectedStatus(status); 
            changeStatusPoliciesResults(status);
        }
    };

    return (
        <div className="text-center">
            <p className="text-lg font-semibold text-alternGray mb-4">Estado de póliza</p>
            <div className="flex justify-center items-center space-x-4">
                <div className="flex items-center">
                    <Input
                        type="radio"
                        name="statePolicy"
                        checked={selectedStatus === 1}
                        disabled={isAlwaysEmpty}
                        onClick={() => handleStatusChange(1)} 
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                    />
                    <label className="ml-2">Activa</label>
                </div>
                <div className="flex items-center">
                    <Input
                        type="radio"
                        name="statePolicy"
                        checked={selectedStatus === 2}
                        disabled={isAlwaysEmpty}
                        onClick={() => handleStatusChange(2)}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                    />
                    <label className="ml-2">Inactiva</label>
                </div>
            </div>
        </div>
    );
};

export default FilterMenuStatus;
