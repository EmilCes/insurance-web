"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import vehicleSchema from '@/schemas/vehicle.schema';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import confirmationPolicySchema from "@/schemas/confirmationPaymentPolicy.schema";
import { useState } from "react";
import { useFormPolicyContext } from "@/lib/context/formPolicyContext";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import { PolicyPlanItem } from "@/api/policyplan.api";
import { createPolicyData, CreatePolicyResponse, PolicyCreateData } from "@/api/policy.api";
import { UserBankAccountResponse } from "@/api/user.api";

const PaymentForm = ({ policyPlan, onPaymentSuccess, accountInfo }: {
    policyPlan: PolicyPlanItem | undefined;
    onPaymentSuccess: (newPolicy: CreatePolicyResponse) => void;
    accountInfo: UserBankAccountResponse | undefined;
}) => {
    const { formPolicyData, deleteFormPolicyData } = useFormPolicyContext();
    const { setShowMessageError, setIsLoading } = useStatusPageContext();
    const [isMonthlyPayment, setIsMonthlyPayment] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<string | undefined>("");

    const expirationDate = new Date(accountInfo != null ?  accountInfo.expirationDateBankAccount : "" );
    const isExpired = new Date() > expirationDate;

    const form = useForm<z.infer<typeof confirmationPolicySchema>>({
        resolver: zodResolver(confirmationPolicySchema),
        defaultValues: {
            monthsOfPayments: 0
        }
    });

    const toogleMonthPayment = (type: "single" | "monthly") => {
        if (type === "single") {
            setSelectedPayment("");
            setIsMonthlyPayment(false);
        } else {
            setIsMonthlyPayment(true);
        }
    };


    const onMonthsValueChanged = (value: number) => {
        if (isMonthlyPayment) {
            setSelectedPayment(value + "");
            form.setValue("monthsOfPayments", value);
        } else {
            if (!isNaN(value) && (value == 1 || value == 0)) {
                form.setValue("monthsOfPayments", value);
            }
        }
    }

    async function onSubmit(values: z.infer<typeof confirmationPolicySchema>) {
        setIsLoading(true);
        try {
            if ((formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
                && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService
                && formPolicyData?.yearOfPolicy && formPolicyData?.idPolicyPlan
            )) {
                const policyDataCreate: PolicyCreateData = {
                    idBrand: formPolicyData.idBrand,
                    idModel: formPolicyData.idModel,
                    series: formPolicyData.series,
                    plates: formPolicyData.plates,
                    idColor: formPolicyData.idColor,
                    idType: formPolicyData.idType,
                    occupants: formPolicyData.occupants,
                    idService: formPolicyData.idService,
                    yearOfPolicy: formPolicyData.yearOfPolicy,
                    idPolicyPlan: formPolicyData.idPolicyPlan,
                    perMonthsPayment: values.monthsOfPayments
                }

                const response = await createPolicyData(policyDataCreate);
                if (response?.status == 201) {
                    onPaymentSuccess(response);
                    deleteFormPolicyData();
                    return;
                }

                throw new Error("Hubo un error al crear la póliza, inténtelo más tarde...");

            } else {
                throw new Error("Hubo un error con los datos de la póliza, inténtelo más tarde...");
            }
        } catch (error) {
            setShowMessageError(true);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <h2 className='text-2xl font-semibold'>Información de pago</h2>
                <h4 className="text-alternGray">Ingrese la información para realizar el pago</h4>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >

                        <div className="grid grid-cols-1 gap-2 mt-4">

                            <FormItem className="mb-0">
                                <FormLabel>Cuenta bancaria registrada</FormLabel>
                                <FormControl>
                                    <Input readOnly value={accountInfo?.bankAccountNumber} />
                                </FormControl>
                            </FormItem>

                            <FormItem className="mb-4">
                                <FormLabel>Fecha de vencimiento</FormLabel>
                                <FormControl>
                                    <Input readOnly value={`${expirationDate.getDate()} de ${expirationDate.toLocaleString('es', { month: 'long' })} del ${expirationDate.getFullYear()}`} />
                                </FormControl>
                                { isExpired ? <label className="text-sm text-red-500">La cuenta bancaria ha expirado, por favor registre otra cuenta en su perfil</label> : <></>}
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="monthsOfPayments"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Método de pago</FormLabel>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <div>
                                <div className="flex flex-row mb-2">
                                    <Input
                                        type="radio"
                                        disabled={isExpired}
                                        name="plan"
                                        className="p-0 mr-2 w-6 h-6 appearance-none border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                                        onChange={() => { onMonthsValueChanged(1); toogleMonthPayment("single"); }}
                                    />
                                    <label>Pago único</label>
                                </div>
                                <div className="flex flex-row">
                                    <Input
                                        type="radio"
                                        disabled={isExpired}
                                        name="plan"
                                        className="p-0 mr-2 w-6 h-6 appearance-none border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                                        onChange={() => { toogleMonthPayment("monthly"); onMonthsValueChanged(0); }}
                                    />
                                    <label>Pago mensuales</label>
                                </div>
                            </div>
                            <FormItem>
                                <FormLabel>Pago cada</FormLabel>
                                <FormControl>
                                    <Select
                                        value={selectedPayment}
                                        disabled={!isMonthlyPayment}
                                        onValueChange={(value) => { onMonthsValueChanged(+value) }}>
                                        <SelectTrigger className={`w-full ${!isMonthlyPayment ? "bg-gray-200 cursor-not-allowed" : ""}`}>
                                            <SelectValue placeholder="Seleccione cada cuántos meses se realizará un pago" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(() => {
                                                const items = [];
                                                const maxPeriod = (policyPlan) ? policyPlan.maxPeriod : 0;
                                                for (let i = 2; i <= maxPeriod; i++) {
                                                    items.push(
                                                        <SelectItem key={i} value={i + ""}>
                                                            {i + " meses"}
                                                        </SelectItem>
                                                    );
                                                }
                                                return items;
                                            })()}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>


                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isExpired}
                                    className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                                    Finalizar compra
                                </Button>
                            </div>

                        </div>

                    </form>
                </Form>
            </div>
        </>
    )
}

export default PaymentForm