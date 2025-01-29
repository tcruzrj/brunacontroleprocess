import { supabase } from "@/integrations/supabase/client";

export interface Process {
  protocol: string
  name: string
  responsible: string
  entrydate: string
  deadline: string
  status: string
  observations: string
}

export const processService = {
  /*async getAll() {
    const { data, error } = await supabase
      .from('processes')
      .select('protocol, name, responsible, entryDate, deadline, status, observations')
      .order('entryDate', { ascending: false })

    if (error) throw error
    return data as Process[]
  },*/

  async getAll() {
    console.log('getAll foi chamado'); // Adicionei um console.log aqui
    const { data, error } = await supabase
      .from('processes')
      .select('protocol, name, responsible, entrydate, deadline, status, observations')
      .order('entrydate', { ascending: false })
  
    if (error) throw error
    return data as Process[]
  },

  async getByProtocol(protocol: string) {
    const { data, error } = await supabase
      .from('processes')
      .select('protocol, name, responsible, entrydate, deadline, status, observations')
      .eq('protocol', protocol)
      .single()

    if (error) throw error
    return data as Process
  },

  async create(process: Omit<Process, 'protocol'>) {
    const protocol = new Date().getTime().toString() // Gera um protocolo único baseado no timestamp
    const { data, error } = await supabase
      .from('processes')
      .insert([{ ...process, protocol }])
      .select()
      .single()

    if (error) throw error
    return data as Process
  },

  async update(protocol: string, process: Partial<Process>) {
    const { data, error } = await supabase
      .from('processes')
      .update(process)
      .eq('protocol', protocol)
      .select()
      .single()

    if (error) throw error
    return data as Process
  },

  async delete(protocol: string) {
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('protocol', protocol)

    if (error) throw error
  },

  async saveProcess(process: Process) {
    const { data, error } = await supabase
      .from('processes')
      .insert([process])

    if (error) {
      console.error('2 -Error saving process:', error)
      throw error
    }

    return data
  }
}

export async function saveProcess(data: any) {
  const { data: result, error } = await supabase
    .from('processes')
    .insert([data]);

  if (error) {
    console.error('3 - Error saving process:', error);
    throw error;
  }

  return result;
}
