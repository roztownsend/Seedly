import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Toast = { message: string; id: number };

type ToastContextType = {
    showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
};

const ToastItem: React.FC<{ toast: Toast; onDone: (id: number) => void }> = ({ toast, onDone }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Appear animation
        const enter = setTimeout(() => setShow(true), 10);
        // Start exit animation before unmount
        const exit = setTimeout(() => setShow(false), 2700); // 300ms for exit
        // Remove from DOM after exit animation
        const remove = setTimeout(() => onDone(toast.id), 3000);

        return () => {
            clearTimeout(enter);
            clearTimeout(exit);
            clearTimeout(remove);
        };
    }, [onDone, toast.id]);

    return (
        <div className={`toast${show ? " toast-show" : ""}`}>
            {toast.message}
        </div>
    );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { message, id }]);
    };

    const handleDone = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onDone={handleDone} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};