import React from "react";
import NavigationBar from "./NavigationBar";
import AddBookForm from "./AddBookForm";
import AddFromFile from "./AddFromFile";


export default function AddBook() {

    return (
        <div>
            <NavigationBar titleText={"ADD BOOK"} />
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <AddBookForm />
                {/* vertical separation line */}
                <div
                    style={{
                        borderLeft: "4px royalblue solid",
                        height: "80%",
                        position: "absolute",
                        left: "50%",
                    }}
                />
                <AddFromFile />
            </div>
        </div>
    );
}
