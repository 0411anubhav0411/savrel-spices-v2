import { useState } from "react";
import axios from "axios";
import { Loader2, LockKeyhole } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminEnquiries() {
    const [key, setKey] = useState("");
    const [rows, setRows] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const load = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
            const res = await axios.get(`${API}/enquiries`, { headers: { "X-Admin-Key": key } });
            setRows(res.data);
        } catch {
            setError("Invalid admin key or server error.");
            setRows(null);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div data-testid="admin-enquiries-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h1 className="font-display text-3xl font-bold text-gray-900">Enquiries</h1>
            <p className="mt-2 text-sm text-gray-500">Internal view — enter the admin key to load submissions.</p>

            <form onSubmit={load} className="mt-6 flex max-w-md gap-3">
                <input
                    data-testid="admin-key-input"
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Admin key"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/15"
                />
                <button data-testid="admin-load-btn" disabled={busy}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A50B24] disabled:opacity-60 transition-colors">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />} Load
                </button>
            </form>
            {error && <p data-testid="admin-error" className="mt-3 text-sm text-red-600">{error}</p>}

            {rows && (
                <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200" data-testid="admin-enquiries-table">
                    <table className="w-full text-sm">
                        <thead className="bg-[#1F1410] text-white text-left">
                            <tr>
                                {["Date", "Name", "Company", "Email", "Phone", "Interest", "Qty", "Message"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && (
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500" data-testid="admin-empty-state">No enquiries yet.</td></tr>
                            )}
                            {rows.map((r) => (
                                <tr key={r.id} className="border-t border-gray-100 odd:bg-[#FDFBF8]">
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{new Date(r.created_at).toLocaleString("en-IN")}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{r.company || "—"}</td>
                                    <td className="px-4 py-3 text-gray-600">{r.email}</td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.phone}</td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.interest || "—"}</td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.quantity || "—"}</td>
                                    <td className="px-4 py-3 text-gray-600 max-w-xs">{r.message || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
