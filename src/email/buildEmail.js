export function buildEmail(channelDetails, updatedItems) {
    const channelDisplayName = channelDetails.displayName;
    const channelHeaderImage = channelDetails.profile.headerImage;

    let emailContent = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Verdana', sans-serif;
                    background-color: #f9f9f9;
                    padding: 20px;
                    margin: 0;
                }
        
                .header {
                    text-align: center;
                    padding: 20px;
                    background-color: #304d63;
                    color: #fff;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                }
        
                .header h2 {
                    margin: 0;
                }
        
                .header img {
                    width: 100%;
                    max-width: 600px;
                    border-radius: 5px;
                    margin-top: 10px;
                }
        
                .items {
                    margin-top: 20px;
                }
        
                .item {
                    margin-bottom: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 15px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border: 1px solid #ddd;
                }
        
                .item-container {
                    display: flex;
                    align-items: center;
                }
        
                .thumbnail {
                    max-width: 160px;
                    max-height: 160px;
                    border-radius: 10px;
                    margin-right: 20px;
                    object-fit: cover;
                }
        
                .item-details {
                    flex: 1;
                }
        
                .item h2 {
                    color: #304d63;
                    margin-bottom: 5px;
                    font-size: 18px;
                }
        
                .item p {
                    color: #555;
                    margin: 5px 0;
                }
        
                .footer {
                    text-align: center;
                    padding: 10px;
                    background-color: #304d63;
                    color: #fff;
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${channelDisplayName}'s Store Update</h1>
                <img src="${channelHeaderImage}" alt="${channelDisplayName}'s Header Image">
            </div>
            <div class="items">
    `;

    updatedItems.forEach((item) => {
        const itemName = item.name;
        const itemDescription = item.description;
        const itemCost = item.cost;
        const itemQuantity = item.quantity.current;
        const itemThumbnail = item.thumbnail || item.preview;

        emailContent += `
            <div class="item">
                <div class="item-container">
                    <img src="${itemThumbnail}" alt="${itemName}" class="thumbnail">
                    <div class="item-details">
                        <h2>${itemName}</h2>
                        <p>${itemDescription}</p>
                        <p><strong>Cost:</strong> $${itemCost}</p>
                        <p><strong>Quantity:</strong> ${itemQuantity}</p>
                    </div>
                </div>
            </div>
        `;
    });

    emailContent += `
            </div>
            <div class="footer">
                ArgosNotifier
            </div>
        </body>
        </html>
    `;

    return emailContent;
}
