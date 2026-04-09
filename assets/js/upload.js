import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
const storage = getStorage(app);

window.uploadImage = async function() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Select a file first');
        return;
    }
    
    // Check file size (max 2MB for SVGs)
    if (file.size > 2 * 1024 * 1024) {
        alert('File too large. Max 2MB');
        return;
    }
    
    const user = auth.currentUser;
    if (!user) {
        alert('Sign in to upload');
        return;
    }
    
    // Create unique filename
    const timestamp = Date.now();
    const filename = `${user.uid}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, `images/${filename}`);
    
    try {
        // Show uploading status
        const preview = document.getElementById('uploadPreview');
        preview.innerHTML = 'Uploading...';
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        // Save to Firestore as a post
        await addDoc(collection(db, 'posts'), {
            type: 'image',
            imageUrl: downloadURL,
            author: user.displayName || user.email,
            userId: user.uid,
            timestamp: serverTimestamp(),
            filename: file.name
        });
        
        preview.innerHTML = '<span style="color: green;">✅ Image posted!</span>';
        fileInput.value = '';
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
    }
};