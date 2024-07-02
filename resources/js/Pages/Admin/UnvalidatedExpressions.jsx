// resources/js/Pages/Admin/UnvalidatedExpressions.jsx
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

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

        post(route('admin.expressions.validate', selectedExpression), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const deleteExpression = (e) => {
        e.preventDefault();

        destroy(route('admin.expressions.destroy', selectedExpression), {
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
            <div>
                <Head title="Unvalidated Expressions" />

                <h1 className="text-2xl font-bold">Unvalidated Expressions</h1>

                <div className="mt-4">
                    {expressions.length === 0 && (
                        <p>No unvalidated expressions found.</p>
                    )}
                    {expressions.map((expression) => (
                        <div
                            key={expression.id}
                            className="mb-4 p-4 border rounded"
                        >
                            <p>
                                <strong>Expression:</strong> {expression.expression}
                            </p>
                            <p>
                                <strong>Right Answer:</strong> {expression.right_answer}
                            </p>
                            <p>
                                <strong>False Answer 1:</strong> {expression.false_answer_one}
                            </p>
                            <p>
                                <strong>False Answer 2:</strong> {expression.false_answer_two}
                            </p>
                            <p>
                                <strong>Expression Language:</strong> {expression.expression_language}
                            </p>
                            <p>
                                <strong>Answer Language:</strong> {expression.answer_language}
                            </p>

                            <div className="mt-2">
                                <button
                                    className="bg-green-500 text-white py-1 px-4 rounded mr-2"
                                    onClick={() => handleValidate(expression.id)}
                                    disabled={processing}
                                >
                                    Validate
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-4 rounded"
                                    onClick={() => handleDelete(expression.id)}
                                    disabled={processing}
                                >
                                    Delete
                                </button>
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
                            Once this expression is deleted, it cannot be recovered.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <DangerButton className="ms-3" disabled={processing}>
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
                            Once this expression is validated, it will be available for use.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <PrimaryButton className="ms-3" disabled={processing}>
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
