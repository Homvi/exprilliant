import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import CustomGuestLayout from "@/Layouts/CustomGuestLayout";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

const getBorderColor = (language) => {
    switch (language) {
        case "en":
            return "border-blue-500"; // English - Blue
        case "es":
            return "border-red-500"; // Spanish - Red
        case "hu":
            return "border-green-500"; // Hungarian - Green
        default:
            return "border-gray-500"; // Default - Gray
    }
};

const UnvalidatedExpressions = ({ expressions }) => {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [confirmingValidation, setConfirmingValidation] = useState(false);
    const [selectedExpression, setSelectedExpression] = useState(null);

    const { delete: destroy, post, processing, reset } = useForm();

    const handleValidate = (id) => {
        setSelectedExpression(id);
        setConfirmingValidation(true);
    };

    const handleDelete = (id) => {
        setSelectedExpression(id);
        setConfirmingDeletion(true);
    };

    const validateExpression = (e) => {
        e.preventDefault();

        post(route("admin.expressions.validate", selectedExpression), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const deleteExpression = (e) => {
        e.preventDefault();

        destroy(route("admin.expressions.destroy", selectedExpression), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setConfirmingValidation(false);
        setSelectedExpression(null);
        reset();
    };

    return (
        <CustomGuestLayout>
            <div className="p-3 bg-[#eff0f7] text-[#171923]">
                <Head title="Unvalidated Expressions" />

                <h1 className="text-2xl font-bold mb-4">
                    Unvalidated Expressions
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expressions.length === 0 && (
                        <p>No unvalidated expressions found.</p>
                    )}
                    {expressions.map((expression) => (
                        <div
                            key={expression.id}
                            className={`border-t-4 ${getBorderColor(
                                expression.expression_language
                            )} rounded-lg shadow-lg p-6 bg-[#171923] text-red-600`}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {expression.expression}
                                </h2>
                                <div>
                                    <button
                                        className="bg-white text-[#171923] py-1 px-4 rounded mr-2"
                                        onClick={() =>
                                            handleValidate(expression.id)
                                        }
                                        disabled={processing}
                                    >
                                        Validate
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-1 px-4 rounded"
                                        onClick={() =>
                                            handleDelete(expression.id)
                                        }
                                        disabled={processing}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p>
                                    <strong>Right Answer:</strong>{" "}
                                    {expression.right_answer}
                                </p>
                                <p>
                                    <strong>False Answer 1:</strong>{" "}
                                    {expression.false_answer_one}
                                </p>
                                <p>
                                    <strong>False Answer 2:</strong>{" "}
                                    {expression.false_answer_two}
                                </p>
                                <p>
                                    <strong>Expression Language:</strong>{" "}
                                    {expression.expression_language}
                                </p>
                                <p>
                                    <strong>Answer Language:</strong>{" "}
                                    {expression.answer_language}
                                </p>
                                <p>
                                    <strong>Submitted by:</strong>{" "}
                                    {expression.user
                                        ? expression.user.name
                                        : "Unknown"}
                                </p>
                                <p>
                                    {expression.user
                                        ? expression.user.email
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal show={confirmingDeletion} onClose={closeModal}>
                    <form onSubmit={deleteExpression} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete this expression?
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Once this expression is deleted, it cannot be
                            recovered.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <DangerButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Delete
                            </DangerButton>
                        </div>
                    </form>
                </Modal>

                <Modal show={confirmingValidation} onClose={closeModal}>
                    <form onSubmit={validateExpression} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to validate this expression?
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Once this expression is validated, it will be
                            available for use.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Validate
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </CustomGuestLayout>
    );
};

export default UnvalidatedExpressions;
