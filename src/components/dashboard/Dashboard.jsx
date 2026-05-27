
// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   PictureAsPdf as PdfIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscanai-ys7r.onrender.com";
// const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   timeout: 30000,
// });

// // ====================== RECEIPT PDF GENERATION ======================
// const generateReceiptPDF = (order) => {
//   try {
//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const margin = 15;
//     let yPosition = 20;

//     // Header
//     doc.setFontSize(22);
//     doc.setTextColor(128, 0, 128);
//     doc.setFont("helvetica", "bold");
//     doc.text("NUTRISCAN-AI", pageWidth / 2, yPosition, { align: "center" });

//     yPosition += 8;
//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.setFont("helvetica", "normal");
//     doc.text("Food & Drink Supply", pageWidth / 2, yPosition, { align: "center" });

//     yPosition += 6;
//     doc.setFontSize(10);
//     doc.setTextColor(150, 150, 150);
//     doc.text("Healthy Meals, Happy Lives", pageWidth / 2, yPosition, { align: "center" });

//     yPosition += 10;
//     doc.setDrawColor(200, 200, 200);
//     doc.line(margin, yPosition, pageWidth - margin, yPosition);

//     yPosition += 10;
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.setFont("helvetica", "bold");
//     doc.text("ORDER RECEIPT", pageWidth / 2, yPosition, { align: "center" });

//     // Order Info
//     yPosition += 12;
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(`Order ID:`, margin, yPosition);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.text(`${order.orderId || "N/A"}`, margin + 35, yPosition);

//     yPosition += 6;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(`Date:`, margin, yPosition);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.text(`${new Date(order.createdAt).toLocaleString()}`, margin + 35, yPosition);

//     yPosition += 6;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(`Customer:`, margin, yPosition);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.text(`${order.personDetails?.name || "Guest"}`, margin + 35, yPosition);

//     yPosition += 6;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(`Table Number:`, margin, yPosition);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.text(`${order.personDetails?.tableNumber || "N/A"}`, margin + 35, yPosition);

//     yPosition += 10;
//     doc.setDrawColor(200, 200, 200);
//     doc.line(margin, yPosition, pageWidth - margin, yPosition);

//     // Items Table Header
//     yPosition += 8;
//     doc.setFillColor(128, 0, 128);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(255, 255, 255);
//     doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, "F");
//     doc.setFontSize(9);
//     doc.text("Item", margin + 3, yPosition + 5);
//     doc.text("Qty", margin + 100, yPosition + 5);
//     doc.text("Price", margin + 130, yPosition + 5);
//     doc.text("Total", margin + 160, yPosition + 5);

//     // Items Rows
//     yPosition += 8;
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(9);

//     let tableY = yPosition;
//     order.items?.forEach((item, index) => {
//       const itemTotal = (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1);
//       const itemName = item.name || "Unknown Item";
//       const itemNameLines = doc.splitTextToSize(itemName, 85);

//       if (tableY + (itemNameLines.length * 5) > doc.internal.pageSize.getHeight() - 40) {
//         doc.addPage();
//         tableY = 20;
//         doc.setFillColor(128, 0, 128);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(255, 255, 255);
//         doc.rect(margin, tableY, pageWidth - (margin * 2), 8, "F");
//         doc.setFontSize(9);
//         doc.text("Item", margin + 3, tableY + 5);
//         doc.text("Qty", margin + 100, tableY + 5);
//         doc.text("Price", margin + 130, tableY + 5);
//         doc.text("Total", margin + 160, tableY + 5);
//         tableY += 8;
//       }

//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(0, 0, 0);
//       for (let i = 0; i < itemNameLines.length; i++) {
//         doc.text(itemNameLines[i], margin + 3, tableY + (i * 4));
//       }

//       const rowHeight = Math.max(5, itemNameLines.length * 4);
//       doc.text(`${item.quantity || 1}`, margin + 100, tableY + (rowHeight / 2));
//       doc.text(`RWF ${(item.finalPrice || item.originalPrice || 0).toLocaleString()}`, margin + 130, tableY + (rowHeight / 2));
//       doc.text(`RWF ${itemTotal.toLocaleString()}`, margin + 160, tableY + (rowHeight / 2));

//       tableY += rowHeight + 2;
//     });

//     // Total
//     yPosition = tableY + 8;
//     doc.setDrawColor(200, 200, 200);
//     doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);

//     const totalAmount = order.orderSummary?.total || order.items?.reduce((sum, item) => 
//       sum + ((item.finalPrice || item.originalPrice || 0) * (item.quantity || 1)), 0) || 0;

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(12);
//     doc.setTextColor(128, 0, 128);
//     doc.text("Total Amount:", pageWidth - margin - 70, yPosition);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`RWF ${totalAmount.toLocaleString()}`, pageWidth - margin - 15, yPosition, { align: "right" });

//     // Footer
//     yPosition += 15;
//     doc.setDrawColor(200, 200, 200);
//     doc.line(margin, yPosition, pageWidth - margin, yPosition);

//     yPosition += 8;
//     doc.setFontSize(9);
//     doc.setTextColor(100, 100, 100);
//     doc.setFont("helvetica", "italic");
//     doc.text("Thank you for choosing Nutri Scan!", pageWidth / 2, yPosition, { align: "center" });

//     yPosition += 5;
//     doc.setFontSize(8);
//     doc.setTextColor(150, 150, 150);
//     doc.text("support@nutriscan.com | +250 788 123 456", pageWidth / 2, yPosition, { align: "center" });

//     return doc;
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     return null;
//   }
// };

// // ====================== RECEIPT MODAL ======================
// const ReceiptModal = ({ order, onClose, onDownload, onPrint }) => {
//   if (!order) return null;

//   const totalAmount = order.orderSummary?.total || order.items?.reduce((sum, item) => 
//     sum + ((item.finalPrice || item.originalPrice || 0) * (item.quantity || 1)), 0) || 0;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//             <div>
//               <h2 className="text-white font-bold text-xl flex items-center gap-2">
//                 <PdfIcon /> Order Receipt
//               </h2>
//               <p className="text-green-200 text-sm">Order completed successfully</p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="p-1 hover:bg-white/20 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>

//           <div className="p-6">
//             {/* Receipt Content */}
//             <div className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-white">
//               {/* Header */}
//               <div className="text-center border-b pb-4 mb-4">
//                 <h2 className="text-2xl font-bold text-purple-600">NUTRI SCAN</h2>
//                 <p className="text-gray-500 text-sm">Food & Drink Supply</p>
//                 <p className="text-gray-400 text-xs">Healthy Meals, Happy Lives</p>
//               </div>

//               {/* Order Info */}
//               <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
//                 <div>
//                   <p className="text-gray-500 text-xs">Order ID</p>
//                   <p className="font-mono font-medium">{order.orderId?.slice(-12)}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Date</p>
//                   <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Customer</p>
//                   <p className="font-medium">{order.personDetails?.name || "Guest"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Table</p>
//                   <p className="font-medium">Table {order.personDetails?.tableNumber || "N/A"}</p>
//                 </div>
//               </div>

//               {/* Items Table */}
//               <div className="mb-4">
//                 <table className="w-full text-sm">
//                   <thead className="bg-purple-50">
//                     <tr>
//                       <th className="text-left p-2 font-semibold text-purple-600">Item</th>
//                       <th className="text-center p-2 font-semibold text-purple-600">Qty</th>
//                       <th className="text-right p-2 font-semibold text-purple-600">Price</th>
//                       <th className="text-right p-2 font-semibold text-purple-600">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {order.items?.map((item, idx) => {
//                       const itemTotal = (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1);
//                       return (
//                         <tr key={idx} className="border-b">
//                           <td className="p-2">{item.name}</td>
//                           <td className="text-center p-2">{item.quantity}</td>
//                           <td className="text-right p-2">RWF {(item.finalPrice || item.originalPrice || 0).toLocaleString()}</td>
//                           <td className="text-right p-2 font-medium">RWF {itemTotal.toLocaleString()}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                   <tfoot>
//                     <tr className="border-t-2">
//                       <td colSpan="3" className="text-right p-2 font-bold">Total:</td>
//                       <td className="text-right p-2 font-bold text-purple-600">RWF {totalAmount.toLocaleString()}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>

//               {/* Footer */}
//               <div className="text-center border-t pt-4 mt-4">
//                 <p className="text-gray-500 text-sm">Thank you for choosing Nutri Scan!</p>
//                 <p className="text-gray-400 text-xs mt-2">support@nutriscan.com | +250 788 123 456</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={onDownload}
//                 className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium"
//               >
//                 <DownloadIcon /> Download PDF
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={onPrint}
//                 className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
//               >
//                 <PrintIcon /> Print Receipt
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={onClose}
//                 className="px-6 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
//               >
//                 Close
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== AUTH CONTEXT ======================
// const AuthContext = React.createContext(null);

// // ====================== ANIMATED STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <motion.p
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words"
//         >
//           {value}
//         </motion.p>
//         {trend && (
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-1 mt-2"
//           >
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </motion.div>
//         )}
//       </div>
//       <motion.div
//         whileHover={{ rotate: 360 }}
//         transition={{ duration: 0.5 }}
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </motion.div>
//     </div>
//   </motion.div>
// );

// // ====================== ANIMATED BUTTON ======================
// const AnimatedButton = ({
//   onClick,
//   children,
//   variant = "primary",
//   className = "",
//   disabled = false,
//   isLoading = false,
// }) => {
//   const variants = {
//     primary:
//       "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
//     secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
//     danger: "bg-red-500 hover:bg-red-600 text-white",
//     success: "bg-green-500 hover:bg-green-600 text-white",
//   };

//   return (
//     <motion.button
//       whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
//       whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`${variants[variant]} px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${className}`}
//     >
//       {isLoading ? (
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
//         />
//       ) : (
//         children
//       )}
//     </motion.button>
//   );
// };

// // ====================== PAGINATION COMPONENT ======================
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex justify-center items-center gap-2 mt-6"
//     >
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`p-2 rounded-xl transition ${
//           currentPage === 1
//             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//             : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
//         }`}
//       >
//         <ChevronLeftIcon />
//       </motion.button>
//       <div className="flex gap-1">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <motion.button
//             key={page}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => onPageChange(page)}
//             className={`w-8 h-8 rounded-xl text-sm font-medium transition ${
//               currentPage === page
//                 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             {page}
//           </motion.button>
//         ))}
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`p-2 rounded-xl transition ${
//           currentPage === totalPages
//             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//             : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
//         }`}
//       >
//         <ChevronRightIcon />
//       </motion.button>
//     </motion.div>
//   );
// };

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="relative">
//             <motion.img
//               initial={{ scale: 1.1, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/400x200?text=No+Image"
//               }
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x200?text=No+Image";
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="absolute top-4 right-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={onClose}
//                 className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//               >
//                 <CloseIcon className="text-white" />
//               </motion.button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
//             >
//               <h2 className="text-white text-2xl sm:text-3xl font-bold">
//                 {item.name}
//               </h2>
//               <p className="text-white/90 text-sm mt-1">{item.category}</p>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="p-5 sm:p-6 space-y-5"
//           >
//             <div className="flex justify-between items-center pb-3 border-b">
//               <div>
//                 <p className="text-xs text-gray-500">Price</p>
//                 <p className="text-2xl font-bold text-orange-600">
//                   RWF {item.price?.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Prep Time</p>
//                 <p className="text-lg font-semibold flex items-center gap-1">
//                   <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                   {item.prepTime} min
//                 </p>
//               </div>
//               <div>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
//                     item.purineLevel === "low"
//                       ? "bg-green-100 text-green-700"
//                       : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {item.purineLevel?.toUpperCase()} Purine
//                 </motion.span>
//               </div>
//             </div>

//             {item.description && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   📖 Description
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {item.description}
//                 </p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <ListAltIcon className="text-emerald-600" /> Ingredients
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {item.ingredients?.map((ing, idx) => (
//                   <motion.span
//                     key={idx}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                   >
//                     {ing}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <HealingIcon className="text-blue-500" /> Dietary Information
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   { label: "Gluten", value: item.containsGluten },
//                   { label: "Peanuts", value: item.containsPeanuts },
//                   { label: "Shellfish", value: item.containsShellfish },
//                   { label: "Dairy", value: item.containsDairy },
//                   { label: "High Salt", value: item.highSalt },
//                 ].map((diet, idx) => (
//                   <motion.div
//                     key={diet.label}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.05 }}
//                     className={`flex items-center gap-2 p-2 rounded-lg ${
//                       diet.value ? "bg-red-50" : "bg-green-50"
//                     }`}
//                   >
//                     <motion.span
//                       animate={{ scale: diet.value ? [1, 1.2, 1] : 1 }}
//                       transition={{
//                         duration: 0.5,
//                         repeat: diet.value ? Infinity : 0,
//                       }}
//                       className={`w-2 h-2 rounded-full ${
//                         diet.value ? "bg-red-500" : "bg-green-500"
//                       }`}
//                     ></motion.span>
//                     <span className="text-sm">
//                       {diet.label}: {diet.value ? "Contains" : "Free"}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <div className="space-y-4">
//           <motion.div
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="h-32 bg-gray-200 rounded"
//           />
//         </div>
//       </motion.div>
//     );

//   if (!analytics || !analytics.success)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No daily data available
//       </motion.div>
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-orange-100 rounded-xl"
//         >
//           <TodayIcon className="text-orange-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-3xl font-bold"
//             >
//               {analytics.totalOrders || 0}
//             </motion.p>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-2xl font-bold"
//             >
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </motion.p>
//           </motion.div>
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.mostOrderedPlates?.slice(0, 5).map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-orange-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.mostOrderedPlates ||
//               analytics.mostOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">
//                 No orders today
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS CARD ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <motion.div
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="h-64 bg-gray-200 rounded"
//         />
//       </motion.div>
//     );

//   if (!analytics || !analytics.success)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No weekly data available
//       </motion.div>
//     );

//   const totalOrders = analytics.totalOrders || 0;
//   const totalIncome = analytics.totalIncome || 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-blue-100 rounded-xl"
//         >
//           <DateRangeIcon className="text-blue-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Analytics
//         </h2>
//         <span className="text-xs text-gray-400 ml-2 capitalize">
//           ({analytics.period})
//         </span>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
//         >
//           <p className="text-sm opacity-90">Total Orders (Week)</p>
//           <motion.p
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             className="text-3xl font-bold"
//           >
//             {totalOrders}
//           </motion.p>
//         </motion.div>
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
//         >
//           <p className="text-sm opacity-90">Total Income (Week)</p>
//           <motion.p
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             className="text-2xl font-bold"
//           >
//             RWF {totalIncome.toLocaleString()}
//           </motion.p>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <ArrowUpIcon fontSize="small" className="text-green-500" /> Most
//             Ordered Plates
//           </p>
//           <div className="space-y-2">
//             {analytics.mostOrderedPlates?.map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-green-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-green-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.mostOrderedPlates ||
//               analytics.mostOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">
//                 No orders this week
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <ArrowDownIcon fontSize="small" className="text-red-500" /> Least
//             Ordered Plates
//           </p>
//           <div className="space-y-2">
//             {analytics.leastOrderedPlates?.map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-red-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-red-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.leastOrderedPlates ||
//               analytics.leastOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">
//                 All items sold evenly
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     sodiumMg: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   // Pagination logic
//   const totalPages = Math.ceil(menuItems.length / itemsPerPage);
//   const paginatedItems = menuItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i),
//         ),
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish),
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       highSalt: false,
//       sodiumMg: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
//     >
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                   className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
//                 >
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b"
//       >
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <AnimatedButton
//             variant="secondary"
//             onClick={onRefresh}
//             className="flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </AnimatedButton>
//           <AnimatedButton
//             variant="primary"
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </AnimatedButton>
//         </div>
//       </motion.div>

//       {/* Menu Grid */}
//       {menuItems.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No menu items found. Click "Add Item" to create your first menu
//             item.
//           </p>
//         </motion.div>
//       ) : (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
//           >
//             <AnimatePresence>
//               {paginatedItems.map((item, idx) => (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ delay: idx * 0.05 }}
//                   whileHover={{ y: -5 }}
//                   className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <motion.img
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.5 }}
//                       src={
//                         item.image ||
//                         "https://via.placeholder.com/400x200?text=No+Image"
//                       }
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/400x200?text=No+Image";
//                       }}
//                     />
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       whileHover={{ opacity: 1 }}
//                       className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleEdit(item)}
//                         className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                       >
//                         <EditIcon fontSize="small" />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setViewDetailsItem(item)}
//                         className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setDeleteConfirmId(item._id)}
//                         className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </motion.button>
//                     </motion.div>
//                     <div className="absolute top-3 right-3">
//                       <motion.span
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                           item.purineLevel === "low"
//                             ? "bg-green-500"
//                             : item.purineLevel === "moderate"
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                         } text-white shadow-lg inline-block`}
//                       >
//                         {item.purineLevel}
//                       </motion.span>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                       {item.name}
//                     </h3>
//                     <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                       {item.description}
//                     </p>
//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {item.ingredients?.slice(0, 3).map((ing, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                         >
//                           {ing}
//                         </span>
//                       ))}
//                       {item.ingredients?.length > 3 && (
//                         <span className="text-xs text-gray-400">
//                           +{item.ingredients.length - 3}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-orange-600 font-bold text-xl">
//                         RWF {item.price?.toLocaleString()}
//                       </span>
//                       <span className="text-gray-400 text-xs flex items-center gap-1">
//                         <TimeIcon fontSize="small" /> {item.prepTime} min
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </>
//       )}

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </motion.button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <motion.select
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </motion.select>
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition cursor-pointer"
//                 >
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <motion.img
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </motion.div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.select
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </motion.select>
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl"
//                 >
//                   {[
//                     { label: "Gluten", key: "containsGluten" },
//                     { label: "Peanuts", key: "containsPeanuts" },
//                     { label: "Shellfish", key: "containsShellfish" },
//                     { label: "Dairy", key: "containsDairy" },
//                     {
//                       label: "High Salt",
//                       key: "highSalt",
//                       colSpan: "col-span-2",
//                     },
//                   ].map((option) => (
//                     <label
//                       key={option.key}
//                       className={`flex items-center gap-2 text-sm ${
//                         option.colSpan || ""
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData[option.key]}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             [option.key]: e.target.checked,
//                           })
//                         }
//                         className="w-4 h-4 rounded"
//                       />{" "}
//                       {option.label}
//                     </label>
//                   ))}
//                 </motion.div>
//                 <AnimatedButton
//                   variant="primary"
//                   onClick={handleSubmit}
//                   isLoading={loadingUpload}
//                   className="w-full py-3 text-lg"
//                 >
//                   {editingItem ? "Update Item" : "Create Item"}
//                 </AnimatedButton>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </motion.div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
//   onGenerateReceipt,
//   itemsPerPage = 8,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.tableNumber?.toString().includes(search)) &&
//       (statusFilter === "all" || o.status === statusFilter),
//   );

//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const paginatedOrders = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const totalRevenue = filtered.reduce(
//     (sum, order) => sum + (order.orderSummary?.total || 0),
//     0,
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl overflow-hidden"
//     >
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                 >
//                   <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50"
//       >
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => {
//             setStatusFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//         </select>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b"
//       >
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Showing {paginatedOrders.length} of {filtered.length} orders
//           </span>
//           <span className="text-sm font-semibold text-orange-600">
//             Total Revenue: RWF {totalRevenue.toLocaleString()}
//           </span>
//         </div>
//       </motion.div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h, idx) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             <AnimatePresence>
//               {paginatedOrders.map((order, idx) => {
//                 const statusConfig = getStatusConfig(order.status);
//                 return (
//                   <motion.tr
//                     key={order._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
//                     className="transition"
//                   >
//                     <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                       {order.orderId?.slice(-8)}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       Table {order.personDetails?.tableNumber}
//                     </td>
//                     <td className="px-4 py-3 text-sm font-medium">
//                       <div>
//                         <div>{order.personDetails?.name || "Guest"}</div>
//                         <div className="text-xs text-gray-400">
//                           {order.personDetails?.orderType || "dine-in"}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       <div>
//                         <div>
//                           {order.orderSummary?.totalItems ||
//                             order.items?.length ||
//                             0}{" "}
//                           items
//                         </div>
//                         <div className="text-xs text-gray-400 line-clamp-1">
//                           {order.items?.map((item) => item.name).join(", ")}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                       RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-4 py-3">
//                       <motion.span
//                         whileHover={{ scale: 1.05 }}
//                         className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                       >
//                         {statusConfig.icon}
//                         {order.status}
//                       </motion.span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => onViewDetails(order)}
//                           className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </motion.button>
//                         <motion.select
//                           whileHover={{ scale: 1.02 }}
//                           value={order.status}
//                           onChange={(e) =>
//                             onUpdateStatus(order, e.target.value)
//                           }
//                           className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400 cursor-pointer"
//                         >
//                           {[
//                             "preparing",
//                             "ready",
//                             "completed",
//                           ].map((s) => (
//                             <option key={s} className="capitalize">
//                               {s}
//                             </option>
//                           ))}
//                         </motion.select>
//                         {order.status === "completed" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => onGenerateReceipt(order)}
//                             className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
//                             title="View Receipt"
//                           >
//                             <PdfIcon fontSize="small" />
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => setDeleteConfirmId(order.orderId)}
//                           className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No orders found matching your criteria.
//           </p>
//         </motion.div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </motion.div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModalComponent = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;

//   const calculateSubtotal = () => {
//     return (
//       order.items?.reduce(
//         (sum, item) =>
//           sum +
//           (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//         0,
//       ) || 0
//     );
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//             <h2 className="text-white font-bold text-xl">
//               Order #{order.orderId?.slice(-8)}
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="p-1 hover:bg-white/20 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>
//           <div className="p-6 space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 {
//                   label: "Customer",
//                   value: order.personDetails?.name || "Guest",
//                 },
//                 {
//                   label: "Table Number",
//                   value: order.personDetails?.tableNumber,
//                 },
//                 {
//                   label: "Order Type",
//                   value: order.personDetails?.orderType || "dine-in",
//                   capitalize: true,
//                 },
//                 {
//                   label: "Created At",
//                   value: new Date(order.createdAt).toLocaleString(),
//                 },
//               ].map((field, idx) => (
//                 <motion.div
//                   key={field.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-gray-50 p-3 rounded-xl"
//                 >
//                   <p className="text-xs text-gray-500">{field.label}</p>
//                   <p
//                     className={`font-semibold text-gray-800 ${
//                       field.capitalize ? "capitalize" : ""
//                     }`}
//                   >
//                     {field.value}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {order.bookingDetails?.specialInstructions && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="bg-yellow-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Special Instructions</p>
//                 <p className="text-sm text-gray-700">
//                   {order.bookingDetails.specialInstructions}
//                 </p>
//               </motion.div>
//             )}

//             {order.notes && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="bg-blue-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Notes</p>
//                 <p className="text-sm text-gray-700">{order.notes}</p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <p className="text-xs text-gray-500 mb-2">Status</p>
//               <motion.select
//                 whileHover={{ scale: 1.02 }}
//                 value={order.status}
//                 onChange={(e) => onUpdateStatus(order, e.target.value)}
//                 className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
//               >
//                 {["preparing", "ready", "completed"].map((s) => (
//                   <option key={s} className="capitalize">
//                     {s}
//                   </option>
//                 ))}
//               </motion.select>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.7, type: "spring" }}
//               className="bg-orange-50 p-4 rounded-xl"
//             >
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="text-3xl font-bold text-orange-600">
//                 RWF{" "}
//                 {order.orderSummary?.total?.toLocaleString() ||
//                   calculateSubtotal().toLocaleString()}
//               </p>
//             </motion.div>

//             <div>
//               <p className="text-xs text-gray-500 mb-3">Order Items</p>
//               <div className="space-y-2">
//                 {order.items?.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + idx * 0.05 }}
//                     whileHover={{ scale: 1.02 }}
//                     className="flex flex-col p-3 bg-gray-50 rounded-xl"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <span className="font-bold text-gray-600">
//                           {item.quantity}x
//                         </span>
//                         <span className="font-medium">{item.name}</span>
//                       </div>
//                       <span className="font-bold text-orange-600">
//                         RWF{" "}
//                         {(
//                           (item.finalPrice || item.originalPrice || 0) *
//                           (item.quantity || 1)
//                         ).toLocaleString()}
//                       </span>
//                     </div>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="mt-2 text-xs text-gray-500">
//                         Customizations: {item.customizations.join(", ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <div className="mt-1 text-xs text-gray-500">
//                         Instructions: {item.specialInstructions}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {order.bookingDetails?.statusHistory &&
//               order.bookingDetails.statusHistory.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.0 }}
//                 >
//                   <p className="text-xs text-gray-500 mb-2">Status History</p>
//                   <div className="space-y-1">
//                     {order.bookingDetails.statusHistory.map((history, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 1.1 + idx * 0.05 }}
//                         className="text-xs text-gray-600"
//                       >
//                         <span className="font-medium capitalize">
//                           {history.status}
//                         </span>{" "}
//                         - {new Date(history.timestamp).toLocaleString()}
//                         {history.note && (
//                           <span className="text-gray-400 ml-2">
//                             ({history.note})
//                           </span>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <motion.button
//     whileHover={{ scale: 1.05, y: -2 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </motion.button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [receiptOrder, setReceiptOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       let ordersData = [];
//       if (res.data?.data && Array.isArray(res.data.data)) {
//         ordersData = res.data.data;
//       } else if (Array.isArray(res.data)) {
//         ordersData = res.data;
//       } else if (res.data?.orders && Array.isArray(res.data.orders)) {
//         ordersData = res.data.orders;
//       }

//       const transformed = ordersData.map((o) => ({
//         ...o,
//         orderSummary: o.orderSummary || {
//           total:
//             o.items?.reduce(
//               (sum, item) =>
//                 sum +
//                 (item.finalPrice || item.originalPrice || 0) *
//                   (item.quantity || 1),
//               0,
//             ) || 0,
//           totalItems: o.items?.length || 0,
//         },
//         status: o.status || "pending",
//       }));

//       setOrders(transformed);
//       setStats({
//         totalOrders: transformed.length,
//         totalRevenue: transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0,
//         ),
//         activeOrders: transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status),
//         ).length,
//         pendingOrders: transformed.filter((o) => o.status === "pending").length,
//       });
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       let foodsData = [];
//       if (res.data?.success && res.data.foods) {
//         foodsData = res.data.foods;
//       } else if (Array.isArray(res.data)) {
//         foodsData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         foodsData = res.data.data;
//       }
//       setMenuItems(foodsData);
//     } catch (err) {
//       console.error("Error fetching foods:", err);
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [dailyRes, weeklyRes] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       setDailyAnalytics(dailyRes.data);
//       setWeeklyAnalytics(weeklyRes.data);
//     } catch (e) {
//       console.error("Error fetching analytics:", e);
//       toast.error("Failed to fetch analytics data");
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       const response = await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food created successfully!");
//       } else {
//         toast.error(response.data?.message || "Creation failed");
//       }
//     } catch (err) {
//       console.error("Error creating food:", err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       const response = await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food updated successfully!");
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Error updating food:", err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/foods/${id}`);
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Error deleting food:", err);
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/orders/${order.orderId}/status`,
//         {
//           status: newStatus,
//         },
//       );
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success(`Status updated to ${newStatus}!`);
        
//         // If status changed to completed, show receipt modal
//         if (newStatus === "completed") {
//           // Find the updated order
//           const updatedOrder = orders.find(o => o._id === order._id) || order;
//           setReceiptOrder(updatedOrder);
//           toast.info("Receipt is ready for download!");
//         }
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (e) {
//       console.error("Error updating order status:", e);
//       toast.error(e.response?.data?.message || "Update failed");
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.delete(`/orders/${orderId}`);
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success("Order deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (e) {
//       console.error("Error deleting order:", e);
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const handleDownloadPDF = (order) => {
//     const doc = generateReceiptPDF(order);
//     if (doc) {
//       const fileName = `receipt_${order.orderId || "order"}_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.pdf`;
//       doc.save(fileName);
//       toast.success("Receipt PDF downloaded successfully!");
//     } else {
//       toast.error("Failed to generate PDF");
//     }
//   };

//   const handlePrint = (order) => {
//     const doc = generateReceiptPDF(order);
//     if (doc) {
//       doc.autoPrint();
//       window.open(doc.output('bloburl'), '_blank');
//       toast.success("Print dialog opened!");
//     } else {
//       toast.error("Failed to generate PDF for printing");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = async () => {
//     const token = localStorage.getItem("auth_token");

//     try {
//       if (token) {
//         await axios.post(
//           "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//       }

//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("LOGOUT ERROR:", error.response?.data || error.message);
//       toast.error("Session ended");
//     } finally {
//       // 1. CLEAR STORAGE
//       localStorage.clear();
//       sessionStorage.clear();

//       // 2. CLEAR COOKIES (IMPORTANT)
//       document.cookie.split(";").forEach((cookie) => {
//         document.cookie = cookie
//           .replace(/^ +/, "")
//           .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
//       });

//       // 3. CLEAR AXIOS AUTH HEADER
//       delete axios.defaults.headers.common["Authorization"];

//       // 4. FORCE HARD RESET STATE (important if using React state)
//       window.dispatchEvent(new Event("logout"));

//       // 5. FORCE REDIRECT (no back to dashboard)
//       window.location.replace("/login");
//     }
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"
//           />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </motion.div>
//       </div>
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20"
//     >
//       <ToastContainer position="top-right" />
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3"
//       >
//         <div className="flex items-center gap-3">
//           <motion.div
//             whileHover={{ rotate: 180 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg"
//           >
//             <RestaurantIcon className="text-white" />
//           </motion.div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 180 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//             title="Refresh Data"
//           >
//             <RefreshIcon />
//           </motion.button>
//           <AnimatedButton
//             variant="danger"
//             onClick={handleLogout}
//             className="flex items-center gap-2"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </AnimatedButton>
//         </div>
//       </motion.header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto"
//         >
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </motion.div>
//       </div>

//       <div className="p-4 sm:p-6">
//         <AnimatePresence mode="wait">
//           {activeTab === "overview" && (
//             <motion.div
//               key="overview"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//                 <StatCard
//                   title="Total Orders"
//                   value={stats.totalOrders}
//                   icon={<OrdersIcon />}
//                   color="border-blue-500"
//                 />
//                 <StatCard
//                   title="Revenue"
//                   value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                   icon={<MoneyIcon />}
//                   color="border-green-500"
//                 />
//                 <StatCard
//                   title="Active Orders"
//                   value={stats.activeOrders}
//                   icon={<KitchenIcon />}
//                   color="border-purple-500"
//                 />
//                 <StatCard
//                   title="Pending"
//                   value={stats.pendingOrders}
//                   icon={<TimeIcon />}
//                   color="border-yellow-500"
//                 />
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <DailyAnalyticsCard
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalyticsCard
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <OrdersIcon className="text-orange-500" /> Recent Orders
//                 </h2>
//                 <OrdersTable
//                   orders={orders}
//                   onUpdateStatus={updateOrderStatus}
//                   onViewDetails={setSelectedOrder}
//                   onDeleteOrder={deleteOrder}
//                   onGenerateReceipt={setReceiptOrder}
//                   itemsPerPage={8}
//                 />
//               </div>
//             </motion.div>
//           )}
//           {activeTab === "orders" && (
//             <motion.div
//               key="orders"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <OrdersTable
//                 orders={orders}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//                 onGenerateReceipt={setReceiptOrder}
//                 itemsPerPage={8}
//               />
//             </motion.div>
//           )}
//           {activeTab === "menu" && (
//             <motion.div
//               key="menu"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <MenuManagement
//                 menuItems={menuItems}
//                 onAddItem={handleAddFood}
//                 onEditItem={handleEditFood}
//                 onDeleteItem={handleDeleteFood}
//                 onRefresh={fetchFoods}
//               />
//             </motion.div>
//           )}
//           {activeTab === "analytics" && (
//             <motion.div
//               key="analytics"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <DailyAnalyticsCard
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalyticsCard
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
      
//       {selectedOrder && (
//         <OrderDetailsModalComponent
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
      
//       {/* Receipt Modal */}
//       {receiptOrder && (
//         <ReceiptModal
//           order={receiptOrder}
//           onClose={() => setReceiptOrder(null)}
//           onDownload={() => handleDownloadPDF(receiptOrder)}
//           onPrint={() => handlePrint(receiptOrder)}
//         />
//       )}
//     </motion.div>
//   );
// };












/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Icons
import {
  Dashboard as DashboardIcon,
  RestaurantMenu as MenuIcon,
  ShoppingCart as OrdersIcon,
  Analytics as AnalyticsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  Visibility as VisibilityIcon,
  ListAlt as ListAltIcon,
  Healing as HealingIcon,
  Warning as WarningIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Kitchen as KitchenIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  LocalOffer as LocalOfferIcon,
  DeleteSweep as DeleteSweepIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";

// ====================== API CONFIG ======================
const API_BASE = "https://nutriscanai-ys7r.onrender.com";
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// ====================== RECEIPT PDF GENERATION ======================
const generateReceiptPDF = (order) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(128, 0, 128);
    doc.setFont("helvetica", "bold");
    doc.text("NUTRISCAN-AI", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 8;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Food & Drink Supply", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Healthy Meals, Happy Lives", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER RECEIPT", pageWidth / 2, yPosition, { align: "center" });

    // Order Info
    yPosition += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Order ID:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.orderId || "N/A"}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Date:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${new Date(order.createdAt).toLocaleString()}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Customer:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.personDetails?.name || "Guest"}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Table Number:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.personDetails?.tableNumber || "N/A"}`, margin + 35, yPosition);

    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Items Table Header
    yPosition += 8;
    doc.setFillColor(128, 0, 128);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, "F");
    doc.setFontSize(9);
    doc.text("Item", margin + 3, yPosition + 5);
    doc.text("Qty", margin + 100, yPosition + 5);
    doc.text("Price", margin + 130, yPosition + 5);
    doc.text("Total", margin + 160, yPosition + 5);

    // Items Rows
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);

    let tableY = yPosition;
    order.items?.forEach((item, index) => {
      const itemTotal = (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1);
      const itemName = item.name || "Unknown Item";
      const itemNameLines = doc.splitTextToSize(itemName, 85);

      if (tableY + (itemNameLines.length * 5) > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        tableY = 20;
        doc.setFillColor(128, 0, 128);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.rect(margin, tableY, pageWidth - (margin * 2), 8, "F");
        doc.setFontSize(9);
        doc.text("Item", margin + 3, tableY + 5);
        doc.text("Qty", margin + 100, tableY + 5);
        doc.text("Price", margin + 130, tableY + 5);
        doc.text("Total", margin + 160, tableY + 5);
        tableY += 8;
      }

      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      for (let i = 0; i < itemNameLines.length; i++) {
        doc.text(itemNameLines[i], margin + 3, tableY + (i * 4));
      }

      const rowHeight = Math.max(5, itemNameLines.length * 4);
      doc.text(`${item.quantity || 1}`, margin + 100, tableY + (rowHeight / 2));
      doc.text(`RWF ${(item.finalPrice || item.originalPrice || 0).toLocaleString()}`, margin + 130, tableY + (rowHeight / 2));
      doc.text(`RWF ${itemTotal.toLocaleString()}`, margin + 160, tableY + (rowHeight / 2));

      tableY += rowHeight + 2;
    });

    // Total
    yPosition = tableY + 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);

    const totalAmount = order.orderSummary?.total || order.items?.reduce((sum, item) => 
      sum + ((item.finalPrice || item.originalPrice || 0) * (item.quantity || 1)), 0) || 0;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(128, 0, 128);
    doc.text("Total Amount:", pageWidth - margin - 70, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(`RWF ${totalAmount.toLocaleString()}`, pageWidth - margin - 15, yPosition, { align: "right" });

    // Footer
    yPosition += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 8;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Nutri Scan!", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 5;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("nutriscan@ai.com | +250 785 036 368", pageWidth / 2, yPosition, { align: "center" });

    return doc;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

// ====================== RECEIPT MODAL ======================
const ReceiptModal = ({ order, onClose, onDownload, onPrint }) => {
  if (!order) return null;

  const totalAmount = order.orderSummary?.total || order.items?.reduce((sum, item) => 
    sum + ((item.finalPrice || item.originalPrice || 0) * (item.quantity || 1)), 0) || 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
            <div>
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <PdfIcon /> Order Receipt
              </h2>
              <p className="text-green-200 text-sm">Order completed successfully</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full"
            >
              <CloseIcon className="text-white" />
            </motion.button>
          </div>

          <div className="p-6">
            {/* Receipt Content */}
            <div className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-white">
              {/* Header */}
              <div className="text-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-purple-600">NUTRI SCAN-AI</h2>
                <p className="text-gray-500 text-sm">Food & Drink Supply</p>
                <p className="text-gray-400 text-xs">Healthy Meals, Happy Lives</p>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Order ID</p>
                  <p className="font-mono font-medium">{order.orderId?.slice(-12)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Customer</p>
                  <p className="font-medium">{order.personDetails?.name || "Guest"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Table</p>
                  <p className="font-medium">Table {order.personDetails?.tableNumber || "N/A"}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="text-left p-2 font-semibold text-purple-600">Item</th>
                      <th className="text-center p-2 font-semibold text-purple-600">Qty</th>
                      <th className="text-right p-2 font-semibold text-purple-600">Price</th>
                      <th className="text-right p-2 font-semibold text-purple-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, idx) => {
                      const itemTotal = (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1);
                      return (
                        <tr key={idx} className="border-b">
                          <td className="p-2">{item.name}</td>
                          <td className="text-center p-2">{item.quantity}</td>
                          <td className="text-right p-2">RWF {(item.finalPrice || item.originalPrice || 0).toLocaleString()}</td>
                          <td className="text-right p-2 font-medium">RWF {itemTotal.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2">
                      <td colSpan="3" className="text-right p-2 font-bold">Total:</td>
                      <td className="text-right p-2 font-bold text-purple-600">RWF {totalAmount.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Footer */}
              <div className="text-center border-t pt-4 mt-4">
                <p className="text-gray-500 text-sm">Thank you for choosing Nutri Scan!</p>
                <p className="text-gray-400 text-xs mt-2">nutriscan@ai.com | +250 785 036 368</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium"
              >
                <DownloadIcon /> Download PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPrint}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
              >
                <PrintIcon /> Print Receipt
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ====================== AUTH CONTEXT ======================
const AuthContext = React.createContext(null);

// ====================== ANIMATED STAT CARD ======================
const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
    className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words"
        >
          {value}
        </motion.p>
        {trend && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 mt-2"
          >
            {trend === "up" ? (
              <ArrowUpIcon className="text-green-500 text-sm" />
            ) : (
              <ArrowDownIcon className="text-red-500 text-sm" />
            )}
            <span
              className={`text-xs font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendValue}
            </span>
          </motion.div>
        )}
      </div>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`p-3 rounded-2xl bg-gradient-to-br ${color
          .replace("border-", "from-")
          .replace("-500", "-100")} to-white shadow-inner`}
      >
        {icon}
      </motion.div>
    </div>
  </motion.div>
);

// ====================== ANIMATED BUTTON ======================
const AnimatedButton = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${variants[variant]} px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${className}`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

// ====================== PAGINATION COMPONENT ======================
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-6"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-xl transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <ChevronLeftIcon />
      </motion.button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-xl text-sm font-medium transition ${
              currentPage === page
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-xl transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <ChevronRightIcon />
      </motion.button>
    </motion.div>
  );
};

// ====================== FOOD DETAILS MODAL ======================
const FoodDetailsModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={
                item.image ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={item.name}
              className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x200?text=No+Image";
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 right-4"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
              >
                <CloseIcon className="text-white" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
            >
              <h2 className="text-white text-2xl sm:text-3xl font-bold">
                {item.name}
              </h2>
              <p className="text-white/90 text-sm mt-1">{item.category}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-5 sm:p-6 space-y-5"
          >
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-2xl font-bold text-orange-600">
                  RWF {item.price?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Prep Time</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <TimeIcon fontSize="small" className="text-gray-400" />{" "}
                  {item.prepTime} min
                </p>
              </div>
              <div>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                    item.purineLevel === "low"
                      ? "bg-green-100 text-green-700"
                      : item.purineLevel === "moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.purineLevel?.toUpperCase()} Purine
                </motion.span>
              </div>
            </div>

            {item.description && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  📖 Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <ListAltIcon className="text-emerald-600" /> Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients?.map((ing, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {ing}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <HealingIcon className="text-blue-500" /> Dietary Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Gluten", value: item.containsGluten },
                  { label: "Peanuts", value: item.containsPeanuts },
                  { label: "Shellfish", value: item.containsShellfish },
                  { label: "Dairy", value: item.containsDairy },
                  { label: "High Salt", value: item.highSalt },
                ].map((diet, idx) => (
                  <motion.div
                    key={diet.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      diet.value ? "bg-red-50" : "bg-green-50"
                    }`}
                  >
                    <motion.span
                      animate={{ scale: diet.value ? [1, 1.2, 1] : 1 }}
                      transition={{
                        duration: 0.5,
                        repeat: diet.value ? Infinity : 0,
                      }}
                      className={`w-2 h-2 rounded-full ${
                        diet.value ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></motion.span>
                    <span className="text-sm">
                      {diet.label}: {diet.value ? "Contains" : "Free"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ====================== DAILY ANALYTICS CARD ======================
const DailyAnalyticsCard = ({ analytics, loading }) => {
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-32 bg-gray-200 rounded"
          />
        </div>
      </motion.div>
    );

  if (!analytics || !analytics.success)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
      >
        No daily data available
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 mb-5"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-orange-100 rounded-xl"
        >
          <TodayIcon className="text-orange-600" />
        </motion.div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Daily Analytics
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
          >
            <p className="text-sm opacity-90">Total Orders Today</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold"
            >
              {analytics.totalOrders || 0}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-xl text-white"
          >
            <p className="text-sm opacity-90">Total Income Today</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              RWF {(analytics.totalIncome || 0).toLocaleString()}
            </motion.p>
          </motion.div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <LocalOfferIcon fontSize="small" /> Top Selling Items
          </p>
          <div className="space-y-2">
            {analytics.mostOrderedPlates?.slice(0, 5).map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-orange-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.mostOrderedPlates ||
              analytics.mostOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                No orders today
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ====================== WEEKLY ANALYTICS CARD ======================
const WeeklyAnalyticsCard = ({ analytics, loading }) => {
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-64 bg-gray-200 rounded"
        />
      </motion.div>
    );

  if (!analytics || !analytics.success)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
      >
        No weekly data available
      </motion.div>
    );

  const totalOrders = analytics.totalOrders || 0;
  const totalIncome = analytics.totalIncome || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 mb-5"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-blue-100 rounded-xl"
        >
          <DateRangeIcon className="text-blue-600" />
        </motion.div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Weekly Analytics
        </h2>
        <span className="text-xs text-gray-400 ml-2 capitalize">
          ({analytics.period})
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
        >
          <p className="text-sm opacity-90">Total Orders (Week)</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
          >
            {totalOrders}
          </motion.p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-xl text-white"
        >
          <p className="text-sm opacity-90">Total Income (Week)</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            RWF {totalIncome.toLocaleString()}
          </motion.p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ArrowUpIcon fontSize="small" className="text-green-500" /> Most
            Ordered Plates
          </p>
          <div className="space-y-2">
            {analytics.mostOrderedPlates?.map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-green-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-green-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.mostOrderedPlates ||
              analytics.mostOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                No orders this week
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ArrowDownIcon fontSize="small" className="text-red-500" /> Least
            Ordered Plates
          </p>
          <div className="space-y-2">
            {analytics.leastOrderedPlates?.map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-red-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-red-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.leastOrderedPlates ||
              analytics.leastOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                All items sold evenly
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ====================== MENU MANAGEMENT ======================
const MenuManagement = ({
  menuItems,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    description: "",
    prepTime: "",
    category: "Mains",
    purineLevel: "low",
    containsGluten: false,
    containsPeanuts: false,
    containsShellfish: false,
    containsDairy: false,
    highSalt: false,
    sodiumMg: "",
  });

  const categories = [
    "Mains",
    "Appetizers",
    "Seafood",
    "Vegan",
    "Desserts",
    "Beverages",
    "Soups",
    "Salads",
  ];

  // Pagination logic
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const paginatedItems = menuItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Please fill in name and price");
      return;
    }
    setLoadingUpload(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append(
        "ingredients",
        JSON.stringify(
          formData.ingredients
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i),
        ),
      );
      submitData.append("description", formData.description);
      submitData.append("prepTime", formData.prepTime || "15");
      submitData.append("category", formData.category);
      submitData.append("purineLevel", formData.purineLevel);
      submitData.append("containsGluten", String(formData.containsGluten));
      submitData.append("containsPeanuts", String(formData.containsPeanuts));
      submitData.append(
        "containsShellfish",
        String(formData.containsShellfish),
      );
      submitData.append("containsDairy", String(formData.containsDairy));
      submitData.append("highSalt", String(formData.highSalt));
      if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
      if (imageFile) submitData.append("image", imageFile);

      if (editingItem) {
        await onEditItem(editingItem._id, submitData);
        toast.success("Item updated successfully!");
      } else {
        await onAddItem(submitData);
        toast.success("Item created successfully!");
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoadingUpload(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      description: "",
      prepTime: "",
      category: "Mains",
      purineLevel: "low",
      containsGluten: false,
      containsPeanuts: false,
      containsShellfish: false,
      containsDairy: false,
      highSalt: false,
      sodiumMg: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      ingredients: item.ingredients?.join(", ") || "",
      description: item.description || "",
      prepTime: item.prepTime?.toString() || "",
      category: item.category || "Mains",
      purineLevel: item.purineLevel,
      containsGluten: item.containsGluten,
      containsPeanuts: item.containsPeanuts,
      containsShellfish: item.containsShellfish,
      containsDairy: item.containsDairy,
      highSalt: item.highSalt,
      sodiumMg: item.sodiumMg?.toString() || "",
    });
    setImagePreview(item.image || "");
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
    >
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <DeleteIcon className="text-red-600 text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Item
                </h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    onClick={async () => {
                      await onDeleteItem(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1"
                  >
                    Delete
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MenuIcon className="text-orange-500" /> Menu Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your restaurant's food items
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <AnimatedButton
            variant="secondary"
            onClick={onRefresh}
            className="flex-1 sm:flex-none"
          >
            <RefreshIcon fontSize="small" /> Sync
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex-1 sm:flex-none"
          >
            <AddIcon fontSize="small" /> Add Item
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Menu Grid */}
      {menuItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-400">
            No menu items found. Click "Add Item" to create your first menu
            item.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {paginatedItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={
                        item.image ||
                        "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=No+Image";
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
                      >
                        <EditIcon fontSize="small" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setViewDetailsItem(item)}
                        className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
                      >
                        <VisibilityIcon fontSize="small" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDeleteConfirmId(item._id)}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                      >
                        <DeleteIcon fontSize="small" />
                      </motion.button>
                    </motion.div>
                    <div className="absolute top-3 right-3">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          item.purineLevel === "low"
                            ? "bg-green-500"
                            : item.purineLevel === "moderate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white shadow-lg inline-block`}
                      >
                        {item.purineLevel}
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.ingredients?.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients?.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{item.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold text-xl">
                        RWF {item.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <TimeIcon fontSize="small" /> {item.prepTime} min
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
                <h2 className="text-white font-bold text-xl">
                  {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition"
                >
                  <CloseIcon className="text-white" />
                </motion.button>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    type="text"
                    placeholder="Item Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <motion.input
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    type="number"
                    placeholder="Price (RWF) *"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <motion.textarea
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  placeholder="Ingredients (comma separated)"
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  rows={2}
                />
                <motion.textarea
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    type="number"
                    placeholder="Prep time (minutes)"
                    value={formData.prepTime}
                    onChange={(e) =>
                      setFormData({ ...formData, prepTime: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl"
                  />
                  <motion.select
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </motion.select>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition cursor-pointer"
                >
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <CloudUploadIcon className="text-gray-400 text-4xl" />
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={imagePreview}
                      alt="preview"
                      className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
                    />
                  )}
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.select
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    value={formData.purineLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, purineLevel: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="low">Low Purine</option>
                    <option value="moderate">Moderate Purine</option>
                    <option value="high">High Purine</option>
                  </motion.select>
                  <motion.input
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    type="number"
                    placeholder="Sodium (mg)"
                    value={formData.sodiumMg}
                    onChange={(e) =>
                      setFormData({ ...formData, sodiumMg: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  {[
                    { label: "Gluten", key: "containsGluten" },
                    { label: "Peanuts", key: "containsPeanuts" },
                    { label: "Shellfish", key: "containsShellfish" },
                    { label: "Dairy", key: "containsDairy" },
                    {
                      label: "High Salt",
                      key: "highSalt",
                      colSpan: "col-span-2",
                    },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className={`flex items-center gap-2 text-sm ${
                        option.colSpan || ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData[option.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [option.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </motion.div>
                <AnimatedButton
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={loadingUpload}
                  className="w-full py-3 text-lg"
                >
                  {editingItem ? "Update Item" : "Create Item"}
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FoodDetailsModal
        item={viewDetailsItem}
        onClose={() => setViewDetailsItem(null)}
      />
    </motion.div>
  );
};

// ====================== ORDERS TABLE ======================
const OrdersTable = ({
  orders,
  onUpdateStatus,
  onViewDetails,
  onDeleteOrder,
  onGenerateReceipt,
  itemsPerPage = 8,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusConfig = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-700",
        icon: <TimeIcon fontSize="small" />,
      },
      confirmed: {
        color: "bg-blue-100 text-blue-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      preparing: {
        color: "bg-purple-100 text-purple-700",
        icon: <KitchenIcon fontSize="small" />,
      },
      ready: {
        color: "bg-green-100 text-green-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      served: {
        color: "bg-teal-100 text-teal-700",
        icon: <RestaurantIcon fontSize="small" />,
      },
      completed: {
        color: "bg-gray-100 text-gray-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-700",
        icon: <CancelIcon fontSize="small" />,
      },
    };
    return config[status] || config.pending;
  };

  const filtered = orders.filter(
    (o) =>
      (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.personDetails?.tableNumber?.toString().includes(search)) &&
      (statusFilter === "all" || o.status === statusFilter),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedOrders = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalRevenue = filtered.reduce(
    (sum, order) => sum + (order.orderSummary?.total || 0),
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Delete Order</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this order?
                </p>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    onClick={async () => {
                      await onDeleteOrder(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1"
                  >
                    Delete
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-cyan-50/50"
      >
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-900" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Table..."
            className="w-full pl-10 pr-4 py-2.5 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-orange-400"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 border border-gray-200 rounded-xl bg-cyan focus:ring-2 focus:ring-orange-400"
        >
          <option value="all">All Status</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {paginatedOrders.length} of {filtered.length} orders
          </span>
          <span className="text-sm font-semibold text-orange-600">
            Total Revenue: RWF {totalRevenue.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className=" bg-cyan-500">
            <tr>
              {[
                "Order ID",
                "Table",
                "Customer",
                "Items",
                "Total",
                "Status",
                "Actions",
              ].map((h, idx) => (
                <th
                  key={h}
                  className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-100">
            <AnimatePresence>
              {paginatedOrders.map((order, idx) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
                    className="transition"
                  >
                    <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
                      {order.orderId?.slice(-8)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      Table {order.personDetails?.tableNumber}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      <div>
                        <div>{order.personDetails?.name || "Guest"}</div>
                        <div className="text-xs text-gray-400">
                          {order.personDetails?.orderType || "dine-in"}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div>
                          {order.orderSummary?.totalItems ||
                            order.items?.length ||
                            0}{" "}
                          items
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-1">
                          {order.items?.map((item) => item.name).join(", ")}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-orange-400">
                      RWF {order.orderSummary?.total?.toLocaleString() || 0}
                    </td>
                    <td className="px-4 py-3">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                        {order.status}
                      </motion.span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onViewDetails(order)}
                          className="p-1.5 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition"
                        >
                          <VisibilityIcon fontSize="small" />
                        </motion.button>
                        <motion.select
                          whileHover={{ scale: 1.02 }}
                          value={order.status}
                          onChange={(e) =>
                            onUpdateStatus(order, e.target.value)
                          }
                          className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                        >
                          {[
                            "preparing",
                            "ready",
                            "completed",
                          ].map((s) => (
                            <option key={s} className="capitalize">
                              {s}
                            </option>
                          ))}
                        </motion.select>
                        {order.status === "completed" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onGenerateReceipt(order)}
                            className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
                            title="View Receipt"
                          >
                            <PdfIcon fontSize="small" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeleteConfirmId(order.orderId)}
                          className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <DeleteIcon fontSize="small" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-400">
            No orders found matching your criteria.
          </p>
        </motion.div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};

// ====================== ORDER DETAILS MODAL ======================
const OrderDetailsModalComponent = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const calculateSubtotal = () => {
    return (
      order.items?.reduce(
        (sum, item) =>
          sum +
          (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
        0,
      ) || 0
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
            <h2 className="text-white font-bold text-xl">
              Order #{order.orderId?.slice(-8)}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full"
            >
              <CloseIcon className="text-white" />
            </motion.button>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Customer",
                  value: order.personDetails?.name || "Guest",
                },
                {
                  label: "Table Number",
                  value: order.personDetails?.tableNumber,
                },
                {
                  label: "Order Type",
                  value: order.personDetails?.orderType || "dine-in",
                  capitalize: true,
                },
                {
                  label: "Created At",
                  value: new Date(order.createdAt).toLocaleString(),
                },
              ].map((field, idx) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-3 rounded-xl"
                >
                  <p className="text-xs text-gray-500">{field.label}</p>
                  <p
                    className={`font-semibold text-gray-800 ${
                      field.capitalize ? "capitalize" : ""
                    }`}
                  >
                    {field.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {order.bookingDetails?.specialInstructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-50 p-3 rounded-xl"
              >
                <p className="text-xs text-gray-500">Special Instructions</p>
                <p className="text-sm text-gray-700">
                  {order.bookingDetails.specialInstructions}
                </p>
              </motion.div>
            )}

            {order.notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 p-3 rounded-xl"
              >
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-500 mb-2">Status</p>
              <motion.select
                whileHover={{ scale: 1.02 }}
                value={order.status}
                onChange={(e) => onUpdateStatus(order, e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                {["preparing", "ready", "completed"].map((s) => (
                  <option key={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-orange-50 p-4 rounded-xl"
            >
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-orange-600">
                RWF{" "}
                {order.orderSummary?.total?.toLocaleString() ||
                  calculateSubtotal().toLocaleString()}
              </p>
            </motion.div>

            <div>
              <p className="text-xs text-gray-500 mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-600">
                          {item.quantity}x
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-orange-600">
                        RWF{" "}
                        {(
                          (item.finalPrice || item.originalPrice || 0) *
                          (item.quantity || 1)
                        ).toLocaleString()}
                      </span>
                    </div>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Customizations: {item.customizations.join(", ")}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="mt-1 text-xs text-gray-500">
                        Instructions: {item.specialInstructions}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {order.bookingDetails?.statusHistory &&
              order.bookingDetails.statusHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <p className="text-xs text-gray-500 mb-2">Status History</p>
                  <div className="space-y-1">
                    {order.bookingDetails.statusHistory.map((history, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + idx * 0.05 }}
                        className="text-xs text-gray-600"
                      >
                        <span className="font-medium capitalize">
                          {history.status}
                        </span>{" "}
                        - {new Date(history.timestamp).toLocaleString()}
                        {history.note && (
                          <span className="text-gray-400 ml-2">
                            ({history.note})
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ====================== NAV BUTTON ======================
const NavButton = ({ active, onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
      active
        ? "bg-gradient-to-r from-cyan-500 to-cyan-900 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);

// ====================== MAIN DASHBOARD ======================
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dailyAnalytics, setDailyAnalytics] = useState(null);
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    pendingOrders: 0,
  });
  
  // Refs to track modal states for preservation during refresh
  const modalsStateRef = useRef({
    selectedOrder: null,
    receiptOrder: null,
  });

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/orders");
      let ordersData = [];
      if (res.data?.data && Array.isArray(res.data.data)) {
        ordersData = res.data.data;
      } else if (Array.isArray(res.data)) {
        ordersData = res.data;
      } else if (res.data?.orders && Array.isArray(res.data.orders)) {
        ordersData = res.data.orders;
      }

      const transformed = ordersData.map((o) => ({
        ...o,
        orderSummary: o.orderSummary || {
          total:
            o.items?.reduce(
              (sum, item) =>
                sum +
                (item.finalPrice || item.originalPrice || 0) *
                  (item.quantity || 1),
              0,
            ) || 0,
          totalItems: o.items?.length || 0,
        },
        status: o.status || "pending",
      }));

      setOrders(transformed);
      setStats({
        totalOrders: transformed.length,
        totalRevenue: transformed.reduce(
          (s, o) => s + (o.orderSummary?.total || 0),
          0,
        ),
        activeOrders: transformed.filter(
          (o) => !["completed", "cancelled"].includes(o.status),
        ).length,
        pendingOrders: transformed.filter((o) => o.status === "pending").length,
      });
      
      // After orders update, restore any open modals that refer to orders
      if (modalsStateRef.current.selectedOrder) {
        const updatedOrder = transformed.find(o => o._id === modalsStateRef.current.selectedOrder._id);
        if (updatedOrder) {
          setSelectedOrder(updatedOrder);
        }
      }
      if (modalsStateRef.current.receiptOrder) {
        const updatedReceiptOrder = transformed.find(o => o._id === modalsStateRef.current.receiptOrder._id);
        if (updatedReceiptOrder) {
          setReceiptOrder(updatedReceiptOrder);
        }
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  }, []);

  const fetchFoods = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/foods");
      let foodsData = [];
      if (res.data?.success && res.data.foods) {
        foodsData = res.data.foods;
      } else if (Array.isArray(res.data)) {
        foodsData = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        foodsData = res.data.data;
      }
      setMenuItems(foodsData);
    } catch (err) {
      console.error("Error fetching foods:", err);
      toast.error("Failed to fetch menu");
    }
  }, []);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const [dailyRes, weeklyRes] = await Promise.all([
        axiosInstance.get("/orders/analytics/daily"),
        axiosInstance.get("/orders/analytics/weekly"),
      ]);
      setDailyAnalytics(dailyRes.data);
      setWeeklyAnalytics(weeklyRes.data);
    } catch (e) {
      console.error("Error fetching analytics:", e);
      toast.error("Failed to fetch analytics data");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleAddFood = async (formData) => {
    try {
      const response = await axiosInstance.post("/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food created successfully!");
      } else {
        toast.error(response.data?.message || "Creation failed");
      }
    } catch (err) {
      console.error("Error creating food:", err);
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  const handleEditFood = async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/foods/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food updated successfully!");
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating food:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const response = await axiosInstance.delete(`/foods/${id}`);
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food deleted successfully!");
      } else {
        toast.error(response.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting food:", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const updateOrderStatus = async (order, newStatus) => {
    try {
      const response = await axiosInstance.patch(
        `/orders/${order.orderId}/status`,
        {
          status: newStatus,
        },
      );
      if (response.data?.success) {
        await fetchOrders();
        toast.success(`Status updated to ${newStatus}!`);
        
        // If status changed to completed, show receipt modal
        if (newStatus === "completed") {
          // Find the updated order
          const updatedOrder = orders.find(o => o._id === order._id) || order;
          setReceiptOrder(updatedOrder);
          // Store in ref for preservation
          modalsStateRef.current.receiptOrder = updatedOrder;
          toast.info("Receipt is ready for download!");
        }
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (e) {
      console.error("Error updating order status:", e);
      toast.error(e.response?.data?.message || "Update failed");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axiosInstance.delete(`/orders/${orderId}`);
      if (response.data?.success) {
        // Clear any open modals referencing this order
        if (modalsStateRef.current.selectedOrder?.orderId === orderId) {
          setSelectedOrder(null);
          modalsStateRef.current.selectedOrder = null;
        }
        if (modalsStateRef.current.receiptOrder?.orderId === orderId) {
          setReceiptOrder(null);
          modalsStateRef.current.receiptOrder = null;
        }
        await fetchOrders();
        toast.success("Order deleted successfully!");
      } else {
        toast.error(response.data?.message || "Delete failed");
      }
    } catch (e) {
      console.error("Error deleting order:", e);
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const handleDownloadPDF = (order) => {
    const doc = generateReceiptPDF(order);
    if (doc) {
      const fileName = `receipt_${order.orderId || "order"}_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.pdf`;
      doc.save(fileName);
      toast.success("Receipt PDF downloaded successfully!");
    } else {
      toast.error("Failed to generate PDF");
    }
  };

  const handlePrint = (order) => {
    const doc = generateReceiptPDF(order);
    if (doc) {
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
      toast.success("Print dialog opened!");
    } else {
      toast.error("Failed to generate PDF for printing");
    }
  };

  const refreshAll = async () => {
    // Save current modal states before refresh
    modalsStateRef.current = {
      selectedOrder: selectedOrder,
      receiptOrder: receiptOrder,
    };
    
    setLoading(true);
    await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
    setLoading(false);
    toast.success("Data refreshed!");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      if (token) {
        await axios.post(
          "https://nutriscanai-ys7r.onrender.com/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("LOGOUT ERROR:", error.response?.data || error.message);
      toast.error("Session ended");
    } finally {
      // 1. CLEAR STORAGE
      localStorage.clear();
      sessionStorage.clear();

      // 2. CLEAR COOKIES (IMPORTANT)
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
      });

      // 3. CLEAR AXIOS AUTH HEADER
      delete axios.defaults.headers.common["Authorization"];

      // 4. FORCE HARD RESET STATE (important if using React state)
      window.dispatchEvent(new Event("logout"));

      // 5. FORCE REDIRECT (no back to dashboard)
      window.location.replace("/login");
    }
  };

  // Set up polling for real-time data updates
  useEffect(() => {
    // Initial load
    refreshAll();
    
    // Set up interval to check for new data every 10 seconds
    const intervalId = setInterval(() => {
      // Save current modal states before background refresh
      modalsStateRef.current = {
        selectedOrder: selectedOrder,
        receiptOrder: receiptOrder,
      };
      
      // Fetch data in background without showing loading state
      Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]).catch(err => {
        console.error("Background refresh error:", err);
      });
    }, 10000); // Poll every 10 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount

  // Handle modal state changes to update ref
  useEffect(() => {
    modalsStateRef.current.selectedOrder = selectedOrder;
  }, [selectedOrder]);
  
  useEffect(() => {
    modalsStateRef.current.receiptOrder = receiptOrder;
  }, [receiptOrder]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-b-3 border-cyan-500 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </motion.div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-100"
    >
      <ToastContainer position="top-right" />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 ,}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-cyan-900 to-cyan-500 p-2.5 rounded-2xl shadow-lg"
          >
            <RestaurantIcon className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-Cyan-600 to-cyan-900 bg-clip-text text-transparent">
              NutriScan·AI
            </h1>
            <p className="text-xs text-gray-500">
              Restaurant Intelligence Dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshAll}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            title="Refresh Data"
          >
            <RefreshIcon />
          </motion.button>
          <AnimatedButton
            variant="danger"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogoutIcon fontSize="small" />
            <span className="hidden sm:inline">Logout</span>
          </AnimatedButton>
        </div>
      </motion.header>

      <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto"
        >
          <NavButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<DashboardIcon />}
            label="Overview"
          />
          <NavButton
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            icon={<OrdersIcon />}
            label="Orders"
          />
          <NavButton
            active={activeTab === "menu"}
            onClick={() => setActiveTab("menu")}
            icon={<MenuIcon />}
            label="Menu"
          />
          <NavButton
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
            icon={<AnalyticsIcon />}
            label="Analytics"
          />
        </motion.div>
      </div>

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
                <StatCard
                  title="Total Orders"
                  value={stats.totalOrders}
                  icon={<OrdersIcon />}
                  color="border-cyan-500"
                />
                <StatCard
                  title="Revenue"
                  value={`RWF ${stats.totalRevenue.toLocaleString()}`}
                  icon={<MoneyIcon />}
                  color="border-green-500"
                />
                <StatCard
                  title="Active Orders"
                  value={stats.activeOrders}
                  icon={<KitchenIcon />}
                  color="border-cyan-500"
                />
                <StatCard
                  title="Pending"
                  value={stats.pendingOrders}
                  icon={<TimeIcon />}
                  color="border-green-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <DailyAnalyticsCard
                  analytics={dailyAnalytics}
                  loading={analyticsLoading}
                />
                <WeeklyAnalyticsCard
                  analytics={weeklyAnalytics}
                  loading={analyticsLoading}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <OrdersIcon className="text-cyan-500" /> Recent Orders
                </h2>
                <OrdersTable
                  orders={orders}
                  onUpdateStatus={updateOrderStatus}
                  onViewDetails={setSelectedOrder}
                  onDeleteOrder={deleteOrder}
                  onGenerateReceipt={setReceiptOrder}
                  itemsPerPage={8}
                />
              </div>
            </motion.div>
          )}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersTable
                orders={orders}
                onUpdateStatus={updateOrderStatus}
                onViewDetails={setSelectedOrder}
                onDeleteOrder={deleteOrder}
                onGenerateReceipt={setReceiptOrder}
                itemsPerPage={8}
              />
            </motion.div>
          )}
          {activeTab === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MenuManagement
                menuItems={menuItems}
                onAddItem={handleAddFood}
                onEditItem={handleEditFood}
                onDeleteItem={handleDeleteFood}
                onRefresh={fetchFoods}
              />
            </motion.div>
          )}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailyAnalyticsCard
                  analytics={dailyAnalytics}
                  loading={analyticsLoading}
                />
                <WeeklyAnalyticsCard
                  analytics={weeklyAnalytics}
                  loading={analyticsLoading}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {selectedOrder && (
        <OrderDetailsModalComponent
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
      
      {/* Receipt Modal */}
      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
          onDownload={() => handleDownloadPDF(receiptOrder)}
          onPrint={() => handlePrint(receiptOrder)}
        />
      )}
    </motion.div>
  );
};

