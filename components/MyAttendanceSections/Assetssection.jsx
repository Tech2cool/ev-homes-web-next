import React, { useState } from "react";
import styles from "./leavesection.module.css";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
import { FaCalendarCheck, FaCalendarDay, FaClock, FaMobile, FaMobileAlt, FaTypo3 } from "react-icons/fa";
import AsstsForm from "./Forms/AsstsForm";

const AssetData = [
    {
        apply: "25 April 2025",
        assetsDate: "6 April 2025",
        type: "Mobile",
        remark: " apply to  Mobile",
        status: "Pending",
    },
    {
        apply: "25 April 2025",
        assetsDate: "6 April 2025",
        type: "Mobile",
        remark: " apply to Mobile",
        status: "Approved",
    },
    {
        apply: "25 April 2025",
        assetsDate: "6 April 2025",
        type: "Mobile",
        remark: " apply to Mobile",
        status: "Rejected",
    },
    {
        apply: "25 April 2025",
        assetsDate: "6 April 2025",
        type: "Mobile",
        remark: " apply to Mobile",
        status: "Rejected",
    },
];

function Assets() {
    const [Asset, setAssetData] = useState(AssetData);
    const [filter, setFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredData =
        filter == "All"
            ? Asset
            : Asset.filter((asset) => asset.status === filter);

    return (
        <div className={styles.maincontainer}>
            <div className={styles.leaveSection}>
                <div className={styles.statsWithProgress}>
                    <div className={styles.leavecontainer}>
                        <div className={styles.leavecard} onClick={() => setFilter("All")}>
                            <div className={styles.request}>Requested</div>
                            <div className={styles.numberleave}>{Asset.length}</div>
                        </div>
                        <div
                            className={styles.leavecard}
                            onClick={() => setFilter("Approved")}
                        >
                            <div className={styles.aproved}>Approved</div>
                            <div className={styles.numberleave}>
                                {Asset.filter((l) => l.status === "Approved").length}
                            </div>
                        </div>
                        <div
                            className={styles.leavecard}
                            onClick={() => setFilter("Rejected")}
                        >
                            <div className={styles.rejected}>Rejected</div>
                            <div className={styles.numberleave}>
                                {Asset.filter((l) => l.status === "Rejected").length}
                            </div>
                        </div>
                        <div
                            className={styles.leavecard}
                            onClick={() => setFilter("Pending")}
                        >
                            <div className={styles.pending}>Pending</div>
                            <div className={styles.numberleave}>
                                {Asset.filter((l) => l.status === "Pending").length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.topBar}>
                        <div
                            className={styles.applyButton}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FaMobileAlt className={styles.applyIcon} /> Apply Asset
                        </div>
                    </div>
                    <table className={styles.leaveTable}>
                        <thead>
                            <tr>
                                <th>
                                    <FaCalendarCheck /> Applied On
                                </th>
                                <th>
                                    <FaCalendarDay /> Asset Date
                                </th>
                                <th>
                                    <FaClock /> Asset Type
                                </th>
                                <th>
                                    <FaClock /> Remark
                                </th>

                                <th>
                                    <MdOutlineCallToAction /> Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((asset, index) => (
                                <tr key={index}>
                                    <td>{asset.apply}</td>
                                    <td>{asset.assetsDate}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.remark}</td>

                                    <td>
                                        <span
                                            className={
                                                asset.status === "Approved"
                                                    ? styles.statusApproved
                                                    : asset.status === "Rejected"
                                                        ? styles.statusRejected
                                                        : styles.statusPending
                                            }
                                        >
                                            {asset.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsModalOpen(false)}
                            >
                                x
                            </button>
                            <AsstsForm onCancel={()=>setIsModalOpen(false)}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Assets
