import { create } from 'zustand';

type MemberTier = 'bronze' | 'silver' | 'gold' | 'platinum';

type Member = {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  tier: MemberTier;
  points: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  visits: number;
};

type MemberStore = {
  members: Member[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  addMember: (member: Omit<Member, 'id' | 'memberId' | 'points' | 'totalSpent' | 'visits'>) => Promise<Member>;
  updateMember: (id: string, member: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
};

export const useMemberStore = create<MemberStore>((set) => ({
  members: [],
  loading: false,
  error: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      
      const mappedMembers = data.map((member: any) => ({
        ...member,
        joinDate: new Date(member.joinDate).toISOString().split('T')[0], // YYYY-MM-DD
      }));

      set({ members: mappedMembers });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addMember: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) throw new Error('Failed to create member');
      const newMember = await response.json();
      
      const mappedMember = {
        ...newMember,
        joinDate: new Date(newMember.joinDate).toISOString().split('T')[0],
      };

      set(state => ({
        members: [...state.members, mappedMember]
      }));

      return mappedMember;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateMember: async (id, memberData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) throw new Error('Failed to update member');
      const updatedMember = await response.json();

      const mappedMember = {
        ...updatedMember,
        joinDate: new Date(updatedMember.joinDate).toISOString().split('T')[0],
      };

      set(state => ({
        members: state.members.map(member =>
          member.id === id ? mappedMember : member
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteMember: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete member');

      set(state => ({
        members: state.members.filter(member => member.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));