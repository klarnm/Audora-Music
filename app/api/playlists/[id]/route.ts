import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getDatabase } from '@/lib/mongodb';
import { Playlist, Song } from '@/types/models';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await getDatabase();
    
    // Get playlist
    const playlist = await db
      .collection<Playlist>('playlists')
      .findOne({ _id: new ObjectId(id) });

    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }

    // Get songs in playlist
    const songs = await db
      .collection<Song>('songs')
      .find({ _id: { $in: playlist.songs } })
      .toArray();

    return NextResponse.json({ playlist, songs });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await getDatabase();
    
    // Verify playlist belongs to user
    const playlist = await db
      .collection<Playlist>('playlists')
      .findOne({ _id: new ObjectId(id) });

    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }

    if (playlist.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this playlist' },
        { status: 403 }
      );
    }

    // Delete playlist
    await db
      .collection<Playlist>('playlists')
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ 
      success: true,
      message: 'Playlist deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
