import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { blogDb } from "../../../firebaseConfig";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get('tags')?.split(',') || [];
  const currentId = searchParams.get('current');
  
  if (!tags.length) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  try {
    const blogCollection = collection(blogDb, "blogs");
    const q = query(
      blogCollection,
      where('id', '!=', currentId),
      where('tags', 'array-contains-any', tags),
      limit(3)
    );
    
    const querySnapshot = await getDocs(q);
    const relatedPosts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return new Response(JSON.stringify(relatedPosts), { status: 200 });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}