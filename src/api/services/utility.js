function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist;
	}
}


// console.log(distance(51.507351,-0.127758,24.860735,67.001137));



const find_similarity_users = (user1, user2) => {
    console.log('user1, user1', user1);
    console.log('user2, user2', user2);
    const {images: user1_images, interests: user1_interests, languages: user1_languages, id: id1, ...user1_det } = user1;
    const { images: user2_images,interests: user2_interests,languages: user2_languages, id: id2, ...user2_det } = user2;
    let similarity = 0;
    let len = 0;
    for (k in user1_det) {
        if (user1_det[k] == null || user2_det[k] == null) continue
        if (user1_det[k] == user2_det[k])
            similarity += 1
        len += 1;
    }
    similarity += user1_interests.filter(i => user2_interests.includes(i)).length
    similarity += user1_languages.filter(i => user2_languages.includes(i)).length
    // similarity += user1_images.filter(i => user2_images.includes(i)).length
    len += (user1_interests.length + user2_interests.length) / 2
    len += (user1_languages.length + user2_languages.length) / 2
    // len += (user1_images.length + user2_images.length) / 2
    return similarity / len;
}

module.exports = {find_similarity_users}